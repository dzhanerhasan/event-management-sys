from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from event_groups.models import Group
from .models import Comment, Event
from .serializers import CommentSerializer, EventSerializer
from django.contrib.auth.models import User


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.filter(date__gte=timezone.now().date()).order_by(
        "date", "time"
    )

    serializer_class = EventSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        group_id = self.request.data.get("group")
        if group_id:
            group = Group.objects.get(pk=group_id)
            serializer.save(created_by=self.request.user, group=group)
        else:
            serializer.save(created_by=self.request.user)

    @action(detail=True, methods=["post"])
    def participate(self, request, pk=None):
        event = self.get_object()
        if request.user not in event.attendees.all():
            event.attendees.add(request.user)
            event.save()
        serializer = self.get_serializer(event)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):
        event = self.get_object()
        if request.user in event.attendees.all():
            event.attendees.remove(request.user)
            event.save()
        serializer = self.get_serializer(event)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def my_events(self, request, username=None):
        user = User.objects.get(username=username)
        events = Event.objects.filter(created_by=user)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def participating(self, request, username=None):
        user = User.objects.get(username=username)
        events = Event.objects.filter(attendees=user)
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def comments(self, request, pk=None):
        event = self.get_object()
        comments = Comment.objects.filter(event=event)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def post_comment(self, request, pk=None):
        event = self.get_object()
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, event=event)
            return Response(serializer.data, status=200)
        else:
            return Response(serializer.errors, status=400)

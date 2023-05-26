from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer
from django.contrib.auth.models import User


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.filter(date__gte=timezone.now().date()).order_by(
        "date", "time"
    )
    serializer_class = EventSerializer

    def perform_create(self, serializer):
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

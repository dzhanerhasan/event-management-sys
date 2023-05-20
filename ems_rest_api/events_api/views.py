from rest_framework import viewsets
from .models import Event
from .serializers import EventSerializer
from django.utils import timezone


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.filter(date__gte=timezone.now().date()).order_by(
        "date", "time"
    )
    serializer_class = EventSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

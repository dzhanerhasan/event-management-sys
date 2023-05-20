from django.db import models
from django.contrib.auth.models import User


class Event(models.Model):
    title = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField()
    image_url = models.URLField(blank=True, null=True)
    created_by = models.ForeignKey(
        User, related_name="created_events", on_delete=models.CASCADE
    )
    attendees = models.ManyToManyField(User, related_name="attended_events", blank=True)

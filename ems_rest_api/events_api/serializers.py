from rest_framework import serializers
from .models import Event
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]


class EventSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    attendees = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "location",
            "date",
            "time",
            "description",
            "image_url",
            "created_by",
            "attendees",
        ]

from rest_framework import serializers
from .models import Comment, Event
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["user", "text", "created_at"]


class EventSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    attendees = UserSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

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
            "comments",
        ]

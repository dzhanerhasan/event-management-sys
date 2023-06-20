from django.db import models
from django.contrib.auth.models import User


class Chat(models.Model):
    chat_id = models.CharField(max_length=255, unique=True)
    participants = models.ManyToManyField(User, related_name="chats")
    updated_at = models.DateTimeField(auto_now=True)


class Message(models.Model):
    chat = models.ForeignKey(Chat, related_name="messages", on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name="messages", on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

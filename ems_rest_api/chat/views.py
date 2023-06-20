from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .mypusher import pusher_client
from .models import Chat, Message
from django.contrib.auth.models import User
from django.http import Http404
from django.db.models import Q


class MessageAPIView(APIView):
    def get_chat(self, participant1, participant2):
        chat_id = "-".join(sorted([participant1.username, participant2.username]))
        try:
            chat = Chat.objects.get(chat_id=chat_id)
        except Chat.DoesNotExist:
            chat = Chat.objects.create(chat_id=chat_id)
            chat.participants.add(participant1, participant2)
        return chat

    def post(self, request):
        sender = User.objects.get(username=request.data["username"])
        recipient = User.objects.get(username=request.data["recipient"])
        message_text = request.data["message"]
        chat = self.get_chat(sender, recipient)
        message = Message.objects.create(chat=chat, sender=sender, message=message_text)

        pusher_client.trigger(
            str(chat.id),
            "message",
            {
                "username": request.data["username"],
                "message": request.data["message"],
            },
        )
        return Response([])

    def get(self, request):
        chat_id = request.GET.get("chatId")
        try:
            chat = Chat.objects.get(chat_id=chat_id)
        except Chat.DoesNotExist:
            raise Http404("Chat does not exist")

        messages = chat.messages.all().order_by("timestamp")
        return Response(
            [
                {
                    "sender": message.sender.username,
                    "message": message.message,
                    "timestamp": message.timestamp,
                }
                for message in messages
            ]
        )


class RecentChatAPIView(APIView):
    def get(self, request):
        username = request.GET.get("username")
        user = User.objects.get(username=username)
        chats = user.chats.all().order_by("-updated_at")
        return Response(
            [
                {
                    "username": next(
                        user.username
                        for user in chat.participants.all()
                        if user.username != username
                    ),
                    "updated_at": chat.updated_at,
                }
                for chat in chats
            ]
        )

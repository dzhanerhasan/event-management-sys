from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile, FriendRequest
from django.db.models import Q


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    friends = serializers.SerializerMethodField()
    friend_request_status = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ["user", "picture", "friends", "friend_request_status"]

    def get_friends(self, obj):
        return [friend.user.username for friend in obj.friends.all()]

    def get_friend_request_status(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            friend_request = FriendRequest.objects.filter(
                Q(sender=obj, receiver=request.user.profile)
                | Q(receiver=obj, sender=request.user.profile)
            ).first()
            if friend_request:
                return friend_request.get_status_display()
        return None


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "email"]


class UserProfileUpdateSerializer(serializers.ModelSerializer):
    user = UserUpdateSerializer()

    class Meta:
        model = UserProfile
        fields = ["user", "picture"]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user")
        user = instance.user

        instance.picture = validated_data.get("picture", instance.picture)
        instance.save()

        user.first_name = user_data.get("first_name", user.first_name)
        user.last_name = user_data.get("last_name", user.last_name)
        user.email = user_data.get("email", user.email)
        user.save()

        return instance


class FriendRequestSerializer(serializers.ModelSerializer):
    sender_username = serializers.SerializerMethodField("get_sender_username")
    receiver_username = serializers.SerializerMethodField("get_receiver_username")
    status = serializers.CharField(source="get_status_display")

    class Meta:
        model = FriendRequest
        fields = [
            "id",
            "sender",
            "receiver",
            "status",
            "sender_username",
            "receiver_username",
        ]

    def get_sender_username(self, obj):
        return obj.sender.user.username

    def get_receiver_username(self, obj):
        return obj.receiver.user.username

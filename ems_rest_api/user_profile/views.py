from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import UserProfile, FriendRequest
from .serializers import (
    UserProfileUpdateSerializer,
    UserSerializer,
    UserProfileSerializer,
    FriendRequestSerializer,
)


class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        if hasattr(user, "profile"):
            serializer = UserProfileSerializer(user.profile)
            return Response(serializer.data)
        else:
            return Response({"detail": "User has no profile."})


class UserProfileUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, username):
        user = get_object_or_404(User, username=username)
        if request.user != user:
            return Response(
                {"error": "You can't update another user's profile"},
                status=status.HTTP_403_FORBIDDEN,
            )
        profile = UserProfile.objects.get(user=user)
        serializer = UserProfileUpdateSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileDetailView(APIView):
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        profile = UserProfile.objects.get(user=user)
        serializer = UserProfileSerializer(profile, context={"request": request})
        return Response(serializer.data)


class SendFriendRequestView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, username):
        to_user = get_object_or_404(User, username=username)
        from_user = request.user
        if from_user == to_user:
            return Response(
                {"error": "You cannot send a friend request to yourself."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if FriendRequest.objects.filter(
            sender=from_user.profile, receiver=to_user.profile
        ).exists():
            return Response(
                {"error": "Friend request already sent."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        FriendRequest.objects.create(sender=from_user.profile, receiver=to_user.profile)
        updated_profile = UserProfile.objects.get(user=to_user)
        serializer = UserProfileSerializer(
            updated_profile, context={"request": request}
        )

        return Response(serializer.data)


class FriendRequestResponseView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, request_id, action):
        friend_request = get_object_or_404(FriendRequest, id=request_id)
        if friend_request.receiver.user != request.user:
            return Response(
                {"error": "This is not your friend request to respond."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if action == "accept":
            friend_request.receiver.friends.add(friend_request.sender)
            friend_request.delete()
        elif action == "reject":
            friend_request.delete()
        else:
            return Response(
                {"error": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response({"message": f"Friend request {action}ed."})


class PendingFriendRequestsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        friend_requests = FriendRequest.objects.filter(receiver=request.user.profile)
        serializer = FriendRequestSerializer(friend_requests, many=True)
        return Response(serializer.data)


class CancelFriendRequestView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, username):
        to_user = get_object_or_404(User, username=username)
        from_user = request.user
        try:
            friend_request = FriendRequest.objects.get(
                sender=from_user.profile, receiver=to_user.profile
            )
        except FriendRequest.DoesNotExist:
            return Response(
                {"error": "No friend request to cancel."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        friend_request.delete()
        updated_profile = UserProfile.objects.get(user=to_user)
        serializer = UserProfileSerializer(
            updated_profile, context={"request": request}
        )

        return Response(serializer.data)


class DeleteFriendView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, username):
        to_user = get_object_or_404(User, username=username)
        from_user = request.user
        if from_user.profile not in to_user.profile.friends.all():
            return Response(
                {"error": "The user is not in your friend list."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        from_user.profile.friends.remove(to_user.profile)
        return Response(
            {"message": f"{to_user.username} removed from your friend list."}
        )

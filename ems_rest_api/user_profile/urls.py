from django.urls import path
from .views import (
    CancelFriendRequestView,
    DeleteFriendView,
    UserProfileUpdateView,
    CurrentUserView,
    UserProfileDetailView,
    SendFriendRequestView,
    FriendRequestResponseView,
    PendingFriendRequestsView,
)

urlpatterns = [
    path("current-user/", CurrentUserView.as_view(), name="current-user"),
    path(
        "profile-update/<str:username>/",
        UserProfileUpdateView.as_view(),
        name="userprofile-update",
    ),
    path(
        "profile/<str:username>/",
        UserProfileDetailView.as_view(),
        name="userprofile-detail",
    ),
    path(
        "send-friend-request/<str:username>/",
        SendFriendRequestView.as_view(),
        name="send-friend-request",
    ),
    path(
        "respond-friend-request/<int:request_id>/<str:action>/",
        FriendRequestResponseView.as_view(),
        name="respond-friend-request",
    ),
    path(
        "pending-friend-requests/",
        PendingFriendRequestsView.as_view(),
        name="pending-friend-requests",
    ),
    path(
        "cancel-friend-request/<str:username>/",
        CancelFriendRequestView.as_view(),
        name="cancel-friend-request",
    ),
    path(
        "delete-friend/<str:username>/",
        DeleteFriendView.as_view(),
        name="delete-friend",
    ),
]

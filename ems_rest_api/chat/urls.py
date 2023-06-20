from django.urls import path
from .views import MessageAPIView, RecentChatAPIView

urlpatterns = [
    path("messages", MessageAPIView.as_view()),
    path("recent", RecentChatAPIView.as_view()),
]

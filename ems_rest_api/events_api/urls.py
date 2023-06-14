from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet

router = DefaultRouter()
router.register("", EventViewSet, basename="event")

urlpatterns = [
    path("", include(router.urls)),
    path(
        "my_events/<str:username>/",
        EventViewSet.as_view({"get": "my_events"}),
        name="my_events",
    ),
    path(
        "participating/<str:username>/",
        EventViewSet.as_view({"get": "participating"}),
        name="participating",
    ),
]

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("auth_api.urls")),
    path("api/users/", include("user_profile.urls")),
    path("api/events/", include("events_api.urls")),
    path("api/chat/", include("chat.urls")),
    path("api/groups/", include("event_groups.urls")),
]

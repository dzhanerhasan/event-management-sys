from django.urls import path
from .views import GroupList, GroupDetail, UserAdminGroupsList

urlpatterns = [
    path("", GroupList.as_view(), name="group-list"),
    path("<int:pk>", GroupDetail.as_view(), name="group-detail"),
    path(
        "user-admin-groups",
        UserAdminGroupsList.as_view(),
        name="user-admin-groups",
    ),
]

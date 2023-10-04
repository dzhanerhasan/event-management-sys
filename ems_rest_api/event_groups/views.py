from rest_framework import generics
from .models import Group, Membership
from .serializers import GroupSerializer
from django.db.models import Q


class GroupList(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def perform_create(self, serializer):
        group = serializer.save()

        Membership.objects.create(user=self.request.user, group=group, role="Admin")


class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class UserAdminGroupsList(generics.ListAPIView):
    serializer_class = GroupSerializer

    def get_queryset(self):
        user = self.request.user
        user_admin_moderator_groups = Membership.objects.filter(
            Q(role="Admin") | Q(role="Moderator"), user=user
        ).values_list("group", flat=True)
        return Group.objects.filter(id__in=user_admin_moderator_groups)

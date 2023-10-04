from rest_framework import serializers
from .models import Group, Membership
from django.contrib.auth.models import User


class MembershipSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Membership
        fields = ["user", "role"]


class GroupSerializer(serializers.ModelSerializer):
    members = MembershipSerializer(many=True, read_only=True, source="membership_set")

    class Meta:
        model = Group
        fields = ["id", "title", "description", "members"]

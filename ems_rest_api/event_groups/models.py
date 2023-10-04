from django.contrib.auth.models import User
from django.db import models


class Group(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    members = models.ManyToManyField(User, through="Membership")
    created_by = models.ForeignKey(
        User, related_name="created_groups", on_delete=models.CASCADE
    )


class Membership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    ROLE_CHOICES = (
        ("Member", "Member"),
        ("Admin", "Admin"),
        ("Moderator", "Moderator"),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="Member")

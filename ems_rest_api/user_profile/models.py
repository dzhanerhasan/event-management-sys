from django.contrib.auth.models import User
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    picture = models.URLField(
        max_length=200,
        blank=True,
        default="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    )
    friends = models.ManyToManyField("self", blank=True)


class FriendRequest(models.Model):
    PENDING = "P"
    ACCEPTED = "A"
    REJECTED = "R"
    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (ACCEPTED, "Accepted"),
        (REJECTED, "Rejected"),
    ]
    sender = models.ForeignKey(
        UserProfile, related_name="sent_requests", on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        UserProfile, related_name="received_requests", on_delete=models.CASCADE
    )
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default=PENDING)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

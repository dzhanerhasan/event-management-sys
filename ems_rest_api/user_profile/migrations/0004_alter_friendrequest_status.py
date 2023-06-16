# Generated by Django 4.1.9 on 2023-06-15 18:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0003_alter_userprofile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='friendrequest',
            name='status',
            field=models.CharField(choices=[('P', 'Pending'), ('C', 'Cancelled'), ('A', 'Accepted'), ('R', 'Rejected')], default='P', max_length=1),
        ),
    ]
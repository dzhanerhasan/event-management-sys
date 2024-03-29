# Generated by Django 4.1.9 on 2023-10-04 12:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('event_groups', '0001_initial'),
        ('events_api', '0003_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='group_events', to='event_groups.group'),
        ),
    ]

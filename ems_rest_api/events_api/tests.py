from django.test import TestCase
from .models import Event


class EventModelTest(TestCase):
    def setUp(self):
        self.event = Event.objects.create(
            title="Test Event",
            location="Test Location",
            date="2023-01-01",
            time="10:00:00",
            description="Test Description",
        )

    def test_title_label(self):
        event = self.event
        field_label = event._meta.get_field("title").verbose_name
        self.assertEqual(field_label, "title")

    def test_location_label(self):
        event = self.event
        field_label = event._meta.get_field("location").verbose_name
        self.assertEqual(field_label, "location")

    def tearDown(self):
        self.event.delete()

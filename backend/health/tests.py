from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from animals.models import Animal
from .models import HealthEvent


def make_animal(**overrides):
    defaults = {
        'name': 'Lola',
        'identifier': 'BOV-001',
        'category': Animal.Category.PRODUCCION,
        'species': 'Vaca',
    }
    defaults.update(overrides)
    return Animal.objects.create(**defaults)


def api_payload(animal, **overrides):
    """JSON-serializable payload for DRF API calls (animal as PK)."""
    payload = {
        'animal': animal.pk,
        'event_type': HealthEvent.EventType.VACUNACION,
        'date': '2026-06-01',
        'description': 'Vacuna anual contra aftosa.',
    }
    payload.update(overrides)
    return payload


def make_event(animal, **overrides):
    """Create a HealthEvent instance directly via ORM (animal as instance)."""
    defaults = {
        'animal': animal,
        'event_type': HealthEvent.EventType.VACUNACION,
        'date': '2026-06-01',
        'description': 'Vacuna anual contra aftosa.',
    }
    defaults.update(overrides)
    return HealthEvent.objects.create(**defaults)


class HealthEventModelTests(TestCase):
    def test_str_includes_type_name_and_date(self):
        animal = make_animal()
        event = make_event(animal)
        self.assertIn('Vacunación', str(event))
        self.assertIn(animal.name, str(event))


class HealthEventApiTests(APITestCase):
    def setUp(self):
        user_model = get_user_model()
        self.user = user_model.objects.create_user(
            username='tester', password='secret-pass-123'
        )
        self.animal = make_animal()
        self.list_url = reverse('health-event-list')
        self.client.force_authenticate(user=self.user)

    # --- Authentication ---------------------------------------------------

    def test_list_requires_authentication(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # --- Creation ---------------------------------------------------------

    def test_create_health_event_with_valid_data(self):
        response = self.client.post(
            self.list_url, api_payload(self.animal), format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(HealthEvent.objects.count(), 1)
        self.assertEqual(response.data['event_type_display'], 'Vacunación')
        self.assertEqual(response.data['animal_name'], self.animal.name)

    def test_event_type_must_be_valid_choice(self):
        response = self.client.post(
            self.list_url,
            api_payload(self.animal, event_type='otro_invalido'),
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('event_type', response.data)

    def test_missing_required_fields_return_400(self):
        response = self.client.post(self.list_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        for field in ('animal', 'event_type', 'date', 'description'):
            self.assertIn(field, response.data)

    # --- Filtering --------------------------------------------------------

    def test_filter_by_animal(self):
        other_animal = make_animal(identifier='EQU-002', name='Rayo')
        make_event(self.animal)
        make_event(other_animal)
        response = self.client.get(self.list_url, {'animal': self.animal.pk})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['animal'], self.animal.pk)

    # --- Detail / update / delete -----------------------------------------

    def test_retrieve_health_event(self):
        event = make_event(self.animal)
        url = reverse('health-event-detail', args=[event.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], event.pk)

    def test_delete_health_event(self):
        event = make_event(self.animal)
        url = reverse('health-event-detail', args=[event.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(HealthEvent.objects.count(), 0)

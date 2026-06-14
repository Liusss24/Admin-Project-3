from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from animals.models import Animal
from .models import FeedingRecord


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
        'date': '2026-06-01',
        'food_type': 'Heno',
        'quantity': '5 kg',
    }
    payload.update(overrides)
    return payload


def make_record(animal, **overrides):
    """Create a FeedingRecord instance directly via ORM (animal as instance)."""
    defaults = {
        'animal': animal,
        'date': '2026-06-01',
        'food_type': 'Heno',
        'quantity': '5 kg',
    }
    defaults.update(overrides)
    return FeedingRecord.objects.create(**defaults)


class FeedingRecordModelTests(TestCase):
    def test_str_includes_animal_name_food_type_and_date(self):
        animal = make_animal()
        record = make_record(animal)
        self.assertIn(animal.name, str(record))
        self.assertIn('Heno', str(record))


class FeedingRecordApiTests(APITestCase):
    def setUp(self):
        user_model = get_user_model()
        self.user = user_model.objects.create_user(
            username='tester', password='secret-pass-123'
        )
        self.animal = make_animal()
        self.list_url = reverse('feeding-record-list')
        self.client.force_authenticate(user=self.user)

    # --- Authentication ---------------------------------------------------

    def test_list_requires_authentication(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # --- Creation ---------------------------------------------------------

    def test_create_feeding_record_with_valid_data(self):
        response = self.client.post(
            self.list_url, api_payload(self.animal), format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FeedingRecord.objects.count(), 1)
        self.assertEqual(response.data['animal_name'], self.animal.name)
        self.assertEqual(response.data['food_type'], 'Heno')

    def test_quantity_and_notes_are_optional(self):
        payload = api_payload(self.animal)
        payload.pop('quantity')
        response = self.client.post(self.list_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_missing_required_fields_return_400(self):
        response = self.client.post(self.list_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        for field in ('animal', 'date', 'food_type'):
            self.assertIn(field, response.data)

    # --- Filtering --------------------------------------------------------

    def test_filter_by_animal(self):
        other_animal = make_animal(identifier='EQU-002', name='Rayo')
        make_record(self.animal)
        make_record(other_animal)
        response = self.client.get(self.list_url, {'animal': self.animal.pk})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['animal'], self.animal.pk)

    # --- Detail / update / delete -----------------------------------------

    def test_retrieve_feeding_record(self):
        record = make_record(self.animal)
        url = reverse('feeding-record-detail', args=[record.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], record.pk)

    def test_delete_feeding_record(self):
        record = make_record(self.animal)
        url = reverse('feeding-record-detail', args=[record.pk])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(FeedingRecord.objects.count(), 0)

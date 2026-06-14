from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Animal


def valid_payload(**overrides):
    payload = {
        'name': 'Lola',
        'identifier': 'BOV-001',
        'category': Animal.Category.PRODUCCION,
        'species': 'Vaca',
        'notes': '',
    }
    payload.update(overrides)
    return payload


class AnimalModelTests(TestCase):
    def test_str_includes_name_and_identifier(self):
        animal = Animal.objects.create(**valid_payload())
        self.assertEqual(str(animal), 'Lola (BOV-001)')

    def test_identifier_is_unique_at_db_level(self):
        Animal.objects.create(**valid_payload())
        with self.assertRaises(IntegrityError):
            Animal.objects.create(**valid_payload(name='Otra'))


class AnimalApiTests(APITestCase):
    def setUp(self):
        user_model = get_user_model()
        self.user = user_model.objects.create_user(
            username='tester', password='secret-pass-123'
        )
        self.list_url = reverse('animal-list')
        self.client.force_authenticate(user=self.user)

    # --- Authentication ---------------------------------------------------

    def test_list_requires_authentication(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # --- Creation ---------------------------------------------------------

    def test_create_animal_with_valid_data(self):
        response = self.client.post(self.list_url, valid_payload(), format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Animal.objects.count(), 1)
        animal = Animal.objects.get()
        self.assertEqual(animal.name, 'Lola')
        self.assertEqual(animal.identifier, 'BOV-001')
        self.assertEqual(animal.category, Animal.Category.PRODUCCION)
        # Serializer exposes a human-readable label for the category.
        self.assertEqual(response.data['category_display'], 'Producción')

    def test_identifier_must_be_unique(self):
        self.client.post(self.list_url, valid_payload(), format='json')
        response = self.client.post(
            self.list_url, valid_payload(name='Repetida'), format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('identifier', response.data)
        self.assertEqual(Animal.objects.count(), 1)

    def test_category_is_required(self):
        response = self.client.post(
            self.list_url, valid_payload(category=''), format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('category', response.data)

    def test_category_must_be_a_valid_choice(self):
        response = self.client.post(
            self.list_url, valid_payload(category='aves'), format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('category', response.data)

    def test_missing_required_fields_return_400(self):
        response = self.client.post(self.list_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        for field in ('name', 'identifier', 'category', 'species'):
            self.assertIn(field, response.data)

    # --- Listing, pagination, filtering, search ---------------------------

    def test_list_is_paginated(self):
        Animal.objects.create(**valid_payload())
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertIn('count', response.data)
        self.assertEqual(response.data['count'], 1)

    def test_filter_by_category(self):
        Animal.objects.create(
            **valid_payload(identifier='WRK-1', category=Animal.Category.TRABAJO)
        )
        Animal.objects.create(
            **valid_payload(identifier='PRD-1', category=Animal.Category.PRODUCCION)
        )
        response = self.client.get(self.list_url, {'category': Animal.Category.TRABAJO})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['identifier'], 'WRK-1')

    def test_search_by_name_or_identifier(self):
        Animal.objects.create(**valid_payload(name='Manchas', identifier='COW-77'))
        Animal.objects.create(**valid_payload(name='Rayo', identifier='HRS-12'))
        by_name = self.client.get(self.list_url, {'search': 'Manchas'})
        self.assertEqual(by_name.data['count'], 1)
        self.assertEqual(by_name.data['results'][0]['identifier'], 'COW-77')
        by_identifier = self.client.get(self.list_url, {'search': 'HRS-12'})
        self.assertEqual(by_identifier.data['count'], 1)
        self.assertEqual(by_identifier.data['results'][0]['name'], 'Rayo')

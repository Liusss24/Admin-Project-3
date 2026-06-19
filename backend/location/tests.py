from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from animals.models import Animal
from .models import Farm, AnimalLocation


def make_animal(**overrides):
    defaults = {
        'name': 'Lola',
        'identifier': 'BOV-001',
        'category': Animal.Category.PRODUCCION,
        'species': 'Vaca',
    }
    defaults.update(overrides)
    return Animal.objects.create(**defaults)


def make_farm(**overrides):
    defaults = {'name': 'Finca Norte', 'description': 'Finca principal'}
    defaults.update(overrides)
    return Farm.objects.create(**defaults)


def make_assignment(animal, farm, **overrides):
    defaults = {
        'animal': animal,
        'farm': farm,
        'lot': 'Lote A',
        'assigned_at': '2026-06-01',
        'is_current': True,
    }
    defaults.update(overrides)
    return AnimalLocation.objects.create(**defaults)


def api_farm_payload(**overrides):
    payload = {'name': 'Finca Sur', 'description': 'Finca secundaria'}
    payload.update(overrides)
    return payload


def api_assignment_payload(animal, farm, **overrides):
    payload = {
        'animal': animal.pk,
        'farm': farm.pk,
        'lot': 'Lote B',
        'assigned_at': '2026-06-01',
    }
    payload.update(overrides)
    return payload


class FarmModelTests(TestCase):
    def test_str_returns_farm_name(self):
        farm = make_farm()
        self.assertEqual(str(farm), 'Finca Norte')


class FarmApiTests(APITestCase):
    def setUp(self):
        user_model = get_user_model()
        self.user = user_model.objects.create_user(
            username='tester', password='secret-pass-123'
        )
        self.list_url = reverse('farm-list')
        self.client.force_authenticate(user=self.user)

    def test_list_requires_authentication(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_farm_with_valid_data(self):
        response = self.client.post(self.list_url, api_farm_payload(), format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Farm.objects.count(), 1)
        self.assertIn('animal_count', response.data)

    def test_farm_animal_count_is_zero_without_assignments(self):
        farm = make_farm()
        url = reverse('farm-detail', args=[farm.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['animal_count'], 0)

    def test_farm_animal_count_counts_only_current_assignments(self):
        animal_a = make_animal(identifier='BOV-001')
        animal_b = make_animal(identifier='BOV-002', name='Mora')
        farm = make_farm()
        make_assignment(animal_a, farm, is_current=True)
        make_assignment(animal_b, farm, is_current=False)
        url = reverse('farm-detail', args=[farm.pk])
        response = self.client.get(url)
        self.assertEqual(response.data['animal_count'], 1)


class AnimalLocationModelTests(TestCase):
    def test_str_includes_animal_farm_and_lot(self):
        animal = make_animal()
        farm = make_farm()
        assignment = make_assignment(animal, farm)
        result = str(assignment)
        self.assertIn(animal.name, result)
        self.assertIn(farm.name, result)
        self.assertIn('Lote A', result)


class AnimalLocationApiTests(APITestCase):
    def setUp(self):
        user_model = get_user_model()
        self.user = user_model.objects.create_user(
            username='tester', password='secret-pass-123'
        )
        self.animal = make_animal()
        self.farm = make_farm()
        self.list_url = reverse('animal-location-list')
        self.client.force_authenticate(user=self.user)

    def test_list_requires_authentication(self):
        self.client.force_authenticate(user=None)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_assignment_is_always_marked_current(self):
        response = self.client.post(
            self.list_url,
            api_assignment_payload(self.animal, self.farm),
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['is_current'], True)

    def test_create_assignment_marks_previous_as_not_current(self):
        make_assignment(self.animal, self.farm)
        new_farm = make_farm(name='Finca Sur')
        self.client.post(
            self.list_url,
            api_assignment_payload(self.animal, new_farm),
            format='json',
        )
        current_count = AnimalLocation.objects.filter(
            animal=self.animal, is_current=True
        ).count()
        self.assertEqual(current_count, 1)

    def test_filter_by_animal(self):
        other_animal = make_animal(identifier='EQU-002', name='Rayo')
        make_assignment(self.animal, self.farm)
        make_assignment(other_animal, self.farm)
        response = self.client.get(self.list_url, {'animal': self.animal.pk})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['animal'], self.animal.pk)

    def test_filter_by_farm(self):
        other_farm = make_farm(name='Finca Sur')
        make_assignment(self.animal, self.farm)
        make_assignment(self.animal, other_farm, is_current=False)
        response = self.client.get(self.list_url, {'farm': self.farm.pk})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['count'], 1)

    def test_retrieve_includes_animal_and_farm_names(self):
        assignment = make_assignment(self.animal, self.farm)
        url = reverse('animal-location-detail', args=[assignment.pk])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['animal_name'], self.animal.name)
        self.assertEqual(response.data['farm_name'], self.farm.name)

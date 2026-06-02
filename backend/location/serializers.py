from rest_framework import serializers
from .models import Farm, AnimalLocation


class FarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = ['id', 'name', 'description', 'created_at']
        read_only_fields = ['created_at']


class AnimalLocationSerializer(serializers.ModelSerializer):
    animal_name = serializers.CharField(source='animal.name', read_only=True)
    farm_name = serializers.CharField(source='farm.name', read_only=True)

    class Meta:
        model = AnimalLocation
        fields = ['id', 'animal', 'animal_name', 'farm', 'farm_name',
                  'lot', 'assigned_at', 'is_current', 'created_at']
        read_only_fields = ['created_at']

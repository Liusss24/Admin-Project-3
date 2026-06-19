from rest_framework import serializers
from .models import Farm, AnimalLocation


class FarmSerializer(serializers.ModelSerializer):
    animal_count = serializers.SerializerMethodField()

    class Meta:
        model = Farm
        fields = ['id', 'name', 'description', 'animal_count', 'created_at']
        read_only_fields = ['animal_count', 'created_at']

    def get_animal_count(self, obj):
        return obj.animals.filter(is_current=True).count()


class AnimalLocationSerializer(serializers.ModelSerializer):
    animal_name = serializers.CharField(source='animal.name', read_only=True)
    farm_name = serializers.CharField(source='farm.name', read_only=True)

    class Meta:
        model = AnimalLocation
        fields = ['id', 'animal', 'animal_name', 'farm', 'farm_name',
                  'lot', 'assigned_at', 'is_current', 'created_at']
        read_only_fields = ['is_current', 'created_at']

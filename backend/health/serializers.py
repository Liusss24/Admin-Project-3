from rest_framework import serializers
from .models import HealthEvent


class HealthEventSerializer(serializers.ModelSerializer):
    event_type_display = serializers.CharField(source='get_event_type_display', read_only=True)
    animal_name = serializers.CharField(source='animal.name', read_only=True)

    class Meta:
        model = HealthEvent
        fields = ['id', 'animal', 'animal_name', 'event_type', 'event_type_display',
                  'date', 'description', 'created_at']
        read_only_fields = ['created_at']

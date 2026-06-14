from rest_framework import serializers
from .models import FeedingRecord


class FeedingRecordSerializer(serializers.ModelSerializer):
    animal_name = serializers.CharField(source='animal.name', read_only=True)

    class Meta:
        model = FeedingRecord
        fields = ['id', 'animal', 'animal_name', 'date', 'food_type',
                  'quantity', 'notes', 'created_at']
        read_only_fields = ['created_at']

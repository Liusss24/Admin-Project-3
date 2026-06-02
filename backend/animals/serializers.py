from rest_framework import serializers
from .models import Animal


class AnimalSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Animal
        fields = ['id', 'name', 'identifier', 'category', 'category_display',
                  'species', 'birth_date', 'notes', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

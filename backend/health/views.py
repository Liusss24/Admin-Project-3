from rest_framework import viewsets, filters
from .models import HealthEvent
from .serializers import HealthEventSerializer


class HealthEventViewSet(viewsets.ModelViewSet):
    queryset = HealthEvent.objects.select_related('animal')
    serializer_class = HealthEventSerializer
    filter_backends = [filters.OrderingFilter]

    def get_queryset(self):
        qs = super().get_queryset()
        animal_id = self.request.query_params.get('animal')
        if animal_id:
            qs = qs.filter(animal_id=animal_id)
        return qs

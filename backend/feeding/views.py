from rest_framework import viewsets, filters
from .models import FeedingRecord
from .serializers import FeedingRecordSerializer


class FeedingRecordViewSet(viewsets.ModelViewSet):
    queryset = FeedingRecord.objects.select_related('animal')
    serializer_class = FeedingRecordSerializer
    filter_backends = [filters.OrderingFilter]

    def get_queryset(self):
        qs = super().get_queryset()
        animal_id = self.request.query_params.get('animal')
        if animal_id:
            qs = qs.filter(animal_id=animal_id)
        return qs

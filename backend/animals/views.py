from rest_framework import viewsets, filters
from .models import Animal
from .serializers import AnimalSerializer


class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'identifier', 'species']

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        health_event_type = self.request.query_params.get('health_event_type')
        health_date_from = self.request.query_params.get('health_date_from')
        health_date_to = self.request.query_params.get('health_date_to')

        if category:
            qs = qs.filter(category=category)

        health_filter: dict = {}
        if health_event_type:
            health_filter['health_events__event_type'] = health_event_type
        if health_date_from:
            health_filter['health_events__date__gte'] = health_date_from
        if health_date_to:
            health_filter['health_events__date__lte'] = health_date_to
        if health_filter:
            qs = qs.filter(**health_filter).distinct()

        return qs

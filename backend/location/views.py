from rest_framework import viewsets, filters
from .models import Farm, AnimalLocation
from .serializers import FarmSerializer, AnimalLocationSerializer


class FarmViewSet(viewsets.ModelViewSet):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class AnimalLocationViewSet(viewsets.ModelViewSet):
    queryset = AnimalLocation.objects.select_related('animal', 'farm')
    serializer_class = AnimalLocationSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        animal_id = self.request.query_params.get('animal')
        farm_id = self.request.query_params.get('farm')
        if animal_id:
            qs = qs.filter(animal_id=animal_id)
        if farm_id:
            qs = qs.filter(farm_id=farm_id)
        return qs

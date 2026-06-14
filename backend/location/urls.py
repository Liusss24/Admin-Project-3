from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FarmViewSet, AnimalLocationViewSet

router = DefaultRouter()
router.register(r'farms', FarmViewSet, basename='farm')
router.register(r'assignments', AnimalLocationViewSet, basename='animal-location')

urlpatterns = [
    path('', include(router.urls)),
]

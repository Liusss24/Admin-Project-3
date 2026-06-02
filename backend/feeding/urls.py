from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FeedingRecordViewSet

router = DefaultRouter()
router.register(r'', FeedingRecordViewSet, basename='feeding-record')

urlpatterns = [
    path('', include(router.urls)),
]

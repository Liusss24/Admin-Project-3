from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/animals/', include('animals.urls')),
    path('api/health/', include('health.urls')),
    path('api/feeding/', include('feeding.urls')),
    path('api/location/', include('location.urls')),
]

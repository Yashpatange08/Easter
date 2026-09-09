from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import home, RegisterView, UserProfileView

urlpatterns = [
    path('', home, name='home'),
    path('api/signup/', RegisterView.as_view(), name='signup'),
    path('api/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/profile/', UserProfileView.as_view(), name='profile'),
]
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    home,
    HealthCheckView,
    RegisterView,
    UserProfileView,
    NoteListCreateView,
    ExamListView,
    PYQListView,
    HelperChatView,
    HelperUploadView,
)

urlpatterns = [
    path('', home, name='home'),
    path('api/health/', HealthCheckView.as_view(), name='health'),
    path('api/signup/', RegisterView.as_view(), name='signup'),
    path('api/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/profile/', UserProfileView.as_view(), name='profile'),
    path('api/notes/', NoteListCreateView.as_view(), name='notes'),
    path('api/exams/', ExamListView.as_view(), name='exams'),
    path('api/pyqs/', PYQListView.as_view(), name='pyqs'),
    path('api/helper/', HelperChatView.as_view(), name='helper'),
    path('api/helper/chat/', HelperChatView.as_view(), name='helper_chat'),
    path('api/helper/upload-pdf/', HelperUploadView.as_view(), name='helper_upload'),
]
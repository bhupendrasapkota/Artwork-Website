from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', views.signup_api, name='signup_api'),
    path('login/', views.login_api, name='login_api'),
    path('delete/', views.delete_user, name='delete_user'),
    path('password-reset/', views.request_password_reset, name='password_reset'),
    path('password-reset/confirm/', views.reset_password_confirm, name='password_reset_confirm'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user-info/', views.get_user_info, name='get_user_info'),
    path('all/', views.get_all_users, name='get_all_users'),
]

from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup_api, name='signup_api'),  # Make sure the URL pattern matches
    path('login/', views.login_api, name='login_api'),  # Make sure the URL pattern matches
    path('delete/', views.delete_user, name='delete_user'),  # Add the URL pattern for delete_user
    path('password-reset/', views.request_password_reset, name='password_reset'),  # Add the URL pattern for password_reset
    path('password-reset/confirm/', views.reset_password_confirm, name='password_reset_confirm'),  # Add the URL pattern for password_reset_confirm
    
]

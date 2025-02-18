from django.urls import path
from . import views

urlpatterns = [
    path('update-profile/', views.update_profile, name='update-profile'),
    path('get-profile/', views.get_profile, name='get-profile'),  # New endpoint to get the profile
]

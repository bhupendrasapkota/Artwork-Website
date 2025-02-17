from django.contrib.auth.models import User
from rest_framework import serializers
from user_profile.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['bio', 'about_me', 'contact', 'profile_picture']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()  # Include Profile data in the UserSerializer

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile']  # Include profile in the response

from rest_framework import serializers
from .models import Profile

# user_profile/serializers.py
class ProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False)

    def validate_profile_picture(self, value):
        if value:
            if value.size > 5 * 1024 * 1024:  # 5 MB size limit
                raise serializers.ValidationError("Profile picture size cannot exceed 5MB.")
            if not value.name.endswith(('.jpg', '.jpeg', '.png')):
                raise serializers.ValidationError("Only JPG, JPEG, and PNG formats are allowed.")
        return value

    class Meta:
        model = Profile
        fields = ['bio', 'about_me', 'contact', 'profile_picture']


from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from user_profile.models import Profile
from user_profile.serializers import ProfileSerializer

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user

    try:
        profile, created = Profile.objects.get_or_create(user=user)

        if 'profile_picture' in request.data and request.FILES.get('profile_picture'):
            if profile.profile_picture and profile.profile_picture.name != 'profile_pics/default.jpg':
                profile.profile_picture.delete(save=False)

        # Update the user's username if provided
        username = request.data.get('username')
        if username:
            user.username = username
            user.save()

        serializer = ProfileSerializer(profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully", "data": serializer.data})

        return Response({"message": "Invalid data", "error": True}, status=400)

    except Exception as e:
        return Response({"message": f"An error occurred: {str(e)}", "error": True}, status=500)


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensures the user is authenticated
def get_profile(request):
    user = request.user
    try:
        profile = Profile.objects.get(user=user)
        return Response({
            "username": user.username,
            "bio": profile.bio,
            "profile_picture": profile.profile_picture.url if profile.profile_picture else None,
            "contact": profile.contact,
            "about_me": profile.about_me,
        })
    except Profile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=404)
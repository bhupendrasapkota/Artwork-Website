from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
import random
from django.core.mail import send_mail
from django.core.cache import cache
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from rest_framework import status
from user_profile.models import Profile

# Sign-up API
@api_view(['POST'])
def signup_api(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # Create user with hashed password
    user = User.objects.create_user(username=username, email=email, password=password)

    # Ensure profile is created (if no signals are used)
    Profile.objects.get_or_create(user=user)

    # Generate JWT token
    refresh = RefreshToken.for_user(user)

    return Response({
        "access_token": str(refresh.access_token),
        "refresh_token": str(refresh),
    }, status=status.HTTP_201_CREATED)


# Login API
@api_view(['POST'])
def login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
            "user": {
                "id": user.id,
                "username": user.username,
            }
        }, status=200)
    
    return Response({"error": "Invalid credentials"}, status=401)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "profile_picture": user.profile.profile_picture.url if user.profile.profile_picture else None,
    })


# Delete User API
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request):
    user = request.user

    password = request.data.get('password')
    if not password:
        return Response({"error": "Password is required to confirm deletion."}, status=400)

    if not user.check_password(password):
        return Response({"error": "Incorrect password."}, status=400)

    user.delete()
    return Response({"message": "User deleted successfully"}, status=200)

@api_view(['POST'])
def request_password_reset(request):
    email = request.data.get('email')

    if not email:
        return Response({"error": "Email is required"}, status=400)

    user = User.objects.filter(email=email).first()
    if not user:
        return Response({"error": "No user found with this email"}, status=404)

    # Generate a 6-digit reset code
    reset_code = str(random.randint(100000, 999999))

    # Save the code in Redis with a 15-minute expiration
    cache.set(f"reset_code_{email}", reset_code, timeout=900)

    # Send email (with error handling)
    try:
        send_mail(
            'Password Reset Code',
            f'Your password reset code is: {reset_code}',
            'no-reply@example.com',  # Update with your actual sender email
            [email],
            fail_silently=False,
        )
    except Exception as e:
        return Response({"error": f"Failed to send email: {str(e)}"}, status=500)

    return Response({"message": "Password reset code sent to your email."}, status=200)

@api_view(['POST'])
def reset_password_confirm(request):
    email = request.data.get('email')
    reset_code = request.data.get('code')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')

    if not email or not reset_code or not new_password or not confirm_password:
        return Response({"error": "All fields are required."}, status=400)

    if new_password != confirm_password:
        return Response({"error": "Passwords do not match."}, status=400)

    try:
        validate_password(new_password)
    except ValidationError as e:
        return Response({"error": str(e)}, status=400)

    # Retrieve the reset code from cache
    stored_code = cache.get(f"reset_code_{email}")

    if not stored_code or stored_code != reset_code:
        return Response({"error": "Invalid or expired reset code."}, status=400)

    # Reset the password
    user = User.objects.filter(email=email).first()
    if not user:
        return Response({"error": "User not found."}, status=404)

    user.set_password(new_password)
    user.save()

    # Clear the reset code from cache
    cache.delete(f"reset_code_{email}")

    return Response({"message": "Password reset successful."}, status=200)
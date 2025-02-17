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
from user_profile.models import Profile  # Corrected import


@api_view(['POST'])
def signup_api(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the username already exists
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the email already exists
    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    # Create the user
    user = User.objects.create_user(username=username, email=email, password=password)

    # Ensure profile is only created if it doesn't exist
    if not hasattr(user, 'profile'):
        profile = Profile.objects.create(user=user)

    # Generate JWT token
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    return Response({"access_token": access_token}, status=status.HTTP_201_CREATED)



@api_view(['POST'])
def login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        return Response({"access_token": access_token}, status=200)
    else:
        return Response({"error": "Invalid credentials"}, status=401)


# Delete User API
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def delete_user(request):
    user = request.user

    # Optional: Add password confirmation logic
    password = request.data.get('password')
    if not password:
        return Response({"error": "Password is required to confirm deletion."}, status=400)

    # Check if the password is correct
    if not user.check_password(password):
        return Response({"error": "Incorrect password."}, status=400)

    # Delete the user
    user.delete()

    return Response({"message": "User deleted successfully"}, status=200)

@api_view(['POST'])
def request_password_reset(request):
    email = request.data.get('email')

    if not email:
        return Response({"error": "Email is required"}, status=400)

    # Check if user exists
    user = User.objects.filter(email=email).first()
    if not user:
        return Response({"error": "No user found with this email"}, status=404)

    # Generate a 6-digit reset code
    reset_code = str(random.randint(100000, 999999))

    # Save the code in Redis (expires after 15 minutes)
    cache.set(f"reset_code_{email}", reset_code, timeout=900)  # 900 seconds = 15 minutes

    # Send the reset code to the user's email
    send_mail(
        'Password Reset Code',
        f'Your password reset code is: {reset_code}',
        'no-reply@example.com',  # Use your email address here
        [email],
        fail_silently=False,
    )

    return Response({"message": "Password reset code sent to your email."}, status=200)

@api_view(['POST'])
def reset_password_confirm(request):
    email = request.data.get('email')
    reset_code = request.data.get('code')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')

    if not email or not reset_code or not new_password or not confirm_password:
        return Response({"message": "All fields are required.", "error": True}, status=400)

    if new_password != confirm_password:
        return Response({"message": "Passwords do not match.", "error": True}, status=400)

    try:
        validate_password(new_password)
    except ValidationError as e:
        return Response({"message": str(e), "error": True}, status=400)

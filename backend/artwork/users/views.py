from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# Sign Up API
@api_view(['POST'])
def signup_api(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({"error": "All fields are required."}, status=400)

    # Check if the user already exists
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username is already taken."}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email is already registered."}, status=400)

    # Create the user
    user = User.objects.create_user(username=username, email=email, password=password)

    # Generate JWT token for the user
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    return Response({"message": "User created successfully", "access_token": access_token}, status=201)


# Login API
@api_view(['POST'])
def login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Both username and password are required."}, status=400)

    user = authenticate(username=username, password=password)

    if not user:
        return Response({"error": "Invalid credentials"}, status=400)

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    return Response({"message": "Login successful", "access_token": access_token}, status=200)


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
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Post
from .serializers import PostSerializer, CommentSerializer
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count

# Upload a new post
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    serializer = PostSerializer(data=request.data, context={'request': request})
    
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Like or unlike a post
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
        user = request.user

        if user in post.likes.all():
            post.likes.remove(user)  # Unlike the post
            return Response({"message": "Post unliked"}, status=status.HTTP_200_OK)
        else:
            post.likes.add(user)  # Like the post
            return Response({"message": "Post liked"}, status=status.HTTP_200_OK)

    except Post.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, post_id):
    try:
        post = Post.objects.get(id=post_id)
        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user, post=post)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Post.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)


class CustomPagination(PageNumberPagination):
    page_size = 10  # Show 10 posts per page
    page_size_query_param = 'page_size'
    max_page_size = 100


@api_view(['GET'])
def list_posts(request):
    posts = Post.objects.all().order_by('-created_at')
    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def most_liked_posts(request):
    posts = Post.objects.annotate(like_count=Count('likes')).order_by('-like_count')[:10]  
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def get_categories(request):
    categories = [category[0] for category in Post.CATEGORY_CHOICES]
    return Response({"categories": categories})


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure only logged-in users can access
def user_posts(request):
    posts = Post.objects.filter(user=request.user).order_by('-created_at')  # Get only the logged-in user's posts
    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

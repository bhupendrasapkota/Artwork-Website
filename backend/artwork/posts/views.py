from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Post, Category
from .serializers import PostSerializer, CommentSerializer
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count
from django.shortcuts import get_object_or_404

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    category_id = request.data.get("category")
    
    if not category_id:
        return Response({"error": "Category ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        category_id = int(category_id)
    except ValueError:
        return Response({"error": "Invalid category ID"}, status=status.HTTP_400_BAD_REQUEST)

    category = get_object_or_404(Category, id=category_id)

    serializer = PostSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save(user=request.user, category=category)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_posts(request, user_id):
    """Fetch all posts created by a specific user."""
    posts = Post.objects.filter(user_id=user_id).order_by('-created_at')

    if not posts.exists():
        return Response([], status=status.HTTP_200_OK) 

    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(result_page, many=True)

    return paginator.get_paginated_response(serializer.data)




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
    page_size = 50  # Show 10 posts per page
    page_size_query_param = 'page_size'
    max_page_size = 100


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_posts(request):
    # If `user_id` is passed, filter by that user
    user_id = request.query_params.get('user_id')

    if user_id:
        posts = Post.objects.filter(user_id=user_id).order_by('-created_at')
    else:
        posts = Post.objects.all().order_by('-created_at')

    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)



@api_view(['GET'])
def most_liked_posts(request):
    posts = Post.objects.annotate(like_count=Count('likes')) \
                        .filter(like_count__gt=5) \
                        .order_by('-like_count')[:10]

    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_categories(request):
    categories = Category.objects.annotate(post_count=Count("posts"))

    categories_data = [
        {
            "id": category.id,
            "name": category.name,
            "post_count": category.post_count,
            "image": request.build_absolute_uri(category.image.url)
        }
        for category in categories
    ]

    return Response({"categories": categories_data})

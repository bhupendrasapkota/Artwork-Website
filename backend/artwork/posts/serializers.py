from rest_framework import serializers
from .models import Post, Comment

class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    likes_count = serializers.SerializerMethodField()
    liked_by = serializers.SerializerMethodField()

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_liked_by(self, obj):
        return [user.username for user in obj.likes.all()]  # List of usernames

    class Meta:
        model = Post
        fields = ['id', 'user', 'title', 'image', 'description', 'created_at', 'likes_count', 'liked_by', 'category']


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Comment
        fields = ['id', 'user', 'text', 'created_at']

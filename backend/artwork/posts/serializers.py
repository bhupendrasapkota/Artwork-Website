from rest_framework import serializers
from .models import Post, Comment

class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    profile_picture = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    liked_by = serializers.SerializerMethodField()
    
    def get_profile_picture(self, obj):
        if obj.user.profile.profile_picture:
            return obj.user.profile.profile_picture.url
        return None

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_liked_by(self, obj):
        return [user.username for user in obj.likes.all()]

    class Meta:
        model = Post
        fields = ['id', 'user','profile_picture', 'title', 'image', 'description', 'created_at', 'likes_count', 'liked_by', 'category']


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Comment
        fields = ['id', 'user', 'text', 'created_at']

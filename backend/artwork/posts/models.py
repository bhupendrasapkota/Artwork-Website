from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    CATEGORY_CHOICES = [
    ("Painting", "Painting"),
    ("Sculpture", "Sculpture"),
    ("Photography", "Photography"),
    ("Digital Art", "Digital Art"),
    ("Mixed Media", "Mixed Media"),
    ("Printmaking", "Printmaking"),
    ("Textile Art", "Textile Art"),
    ("Performance Art", "Performance Art"),
    ("Installation", "Installation"),
    ("Drawing", "Drawing"),
    ("Collage", "Collage"),
    ("Street Art", "Street Art"),
    ("Ceramics", "Ceramics"),
    ("Glass Art", "Glass Art"),
    ("Metalwork", "Metalwork"),
    ("Woodworking", "Woodworking"),
    ("Conceptual Art", "Conceptual Art"),
    ("Contemporary Art", "Contemporary Art"),
    ("Abstract Art", "Abstract Art"),
    ("Classical Art", "Classical Art"),
    ("Figurative Art", "Figurative Art"),
    ("Land Art", "Land Art"),
    ("Film & Video Art", "Film & Video Art"),
    ("Graphic Design", "Graphic Design"),
    ("Illustration", "Illustration"),
    ("Animation", "Animation"),
    ("Virtual Art", "Virtual Art"),
    ("Photography (Fine Art)", "Photography (Fine Art)"),
    ("Environmental Art", "Environmental Art"),
    ("Social Practice", "Social Practice"),
    ("Other", "Other"),
]


    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to="posts/")
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(User, related_name="liked_posts", blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="Other")

    def __str__(self):
        return f"{self.title or 'Post'} - {self.category}"


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}: {self.text[:30]}"

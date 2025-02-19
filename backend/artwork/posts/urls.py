from django.urls import path
from . import views
from .views import get_categories

urlpatterns = [
    path('create/', views.create_post, name='create_post'),
    path('all/', views.list_posts, name='list_posts'),
    path('<int:post_id>/like/', views.like_post, name='like_post'),
    path('<int:post_id>/comment/', views.add_comment, name='add_comment'),
    path('most-liked/', views.most_liked_posts, name='most_liked_posts'),
    path('categories/', get_categories, name='get_categories'),

]

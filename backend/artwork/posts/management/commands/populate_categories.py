from django.core.management.base import BaseCommand
from posts.models import Category

CATEGORY_NAMES = [
    "Painting", "Sculpture", "Photography", "Digital Art", "Mixed Media",
    "Printmaking", "Textile Art", "Performance Art", "Installation", "Drawing",
    "Collage", "Street Art", "Ceramics", "Glass Art", "Metalwork", "Woodworking",
    "Conceptual Art", "Contemporary Art", "Abstract Art", "Classical Art",
    "Figurative Art", "Land Art", "Film & Video Art", "Graphic Design",
    "Illustration", "Animation", "Virtual Art", "Photography (Fine Art)",
    "Environmental Art", "Social Practice", "Other"
]

class Command(BaseCommand):
    help = "Populate the database with category names"

    def handle(self, *args, **kwargs):
        for name in CATEGORY_NAMES:
            Category.objects.get_or_create(name=name)  # Only adds if it doesn't already exist
        self.stdout.write(self.style.SUCCESS("✅ Categories added successfully!"))

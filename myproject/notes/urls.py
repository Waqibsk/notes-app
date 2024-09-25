from django.urls import path
from .views import NoteViewSet, home
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('notes', NoteViewSet, basename='notes')  # Register the NoteViewSet with the router

urlpatterns = [
    path('', home, name='home'),  # Serve index.html
] + router.urls  # Include the router's URLs

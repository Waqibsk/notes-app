from django.shortcuts import render
from rest_framework import viewsets
from .models import Note
from .serializers import NoteSerializer

# Home view to serve the index.html
def home(request):
    return render(request, 'index.html')

# ViewSet for handling notes API requests
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

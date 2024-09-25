from django.db import models

class Note(models.Model):
    title = models.CharField(max_length=100, default="Untitled Note")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

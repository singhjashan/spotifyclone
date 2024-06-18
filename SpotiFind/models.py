from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone



# Create your models here.

class User(AbstractUser):
    pass

class Album(models.Model):
    title = models.CharField(max_length=200)
    cover_image = models.ImageField(upload_to='cover_images/')
    time = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.title

    

# storing songs in song table
class Song(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=200)
    # album = models.CharField(max_length=200, default=None, blank=True, null=True)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, blank=True, null=True)
    audio_file = models.FileField(upload_to='songs/')
    # cover_image = models.ImageField(upload_to='cover_images/', default='cover_images/default.jpg')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    time = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.title
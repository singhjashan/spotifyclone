from django.contrib import admin
from .models import User, Song, Album


# Register your models here.
admin.site.register(User)
admin.site.register(Song)
admin.site.register(Album)

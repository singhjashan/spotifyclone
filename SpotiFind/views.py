from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from django.db import IntegrityError
from django.http import JsonResponse

from .models import User, Song, Album



# Create your views here.

def index(request):
    all_songs = Song.objects.all()
    all_albums = Album.objects.all()
    return render(request, "SpotiFind/layout.html",{
        "all_songs": all_songs,
        "all_albums": all_albums    
    })
    # return HttpResponse ("age")
        

def Getsongs(request):
    songs = list(Song.objects.all().values())  # get all songs  # important: convert the QuerySet to a list
    return JsonResponse(songs, safe=False)

def get_all_albums(request):
    albums = list(Album.objects.all().values())
    return JsonResponse(albums, safe=False)


def get_songs(request, album_id):
    songs = Song.objects.filter(album_id=album_id).values()
    return JsonResponse(list(songs), safe=False)


# def album_view(request, album_id):
#     album = Album.objects.get(id=album_id)
#     songs = album.song_set.all()
#     return render(request, 'SpotiFind/layout.html', {'album': album, 'songs': songs})
    
    

# login function
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "SpotiFind/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "SpotiFind/login.html")


# logout function
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


# register function
def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "SpotiFind/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "SpotiFind/signup.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "SpotiFind/signup.html")
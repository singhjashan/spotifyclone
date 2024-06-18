from django.contrib import admin
from django.urls import path
from SpotiFind import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    
    # API Routes
    path('api/songs/', views.Getsongs,name="Getsongs"),
    path('api/songs/<int:album_id>/', views.get_songs, name="get_songs"),
    path('api/albums/', views.get_all_albums, name='get_all_albums'),
    # path('album/<int:album_id>/', views.album_view, name='album_view'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
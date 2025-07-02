from django.urls import path

from .views import MovieDetailView, MovieRetrieveView

urlpatterns = [path("", MovieRetrieveView.as_view()), path("/<int:movie_id>", MovieDetailView.as_view())]

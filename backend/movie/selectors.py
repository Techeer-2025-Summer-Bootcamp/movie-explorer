from django.db.models import Prefetch, QuerySet
from config.exceptions import MovieNotFound
from .models import Movie, Genre


def get_movie_by_id(movie_id: int) -> Movie:
    try:
        return Movie.objects.prefetch_related(
            Prefetch("genres", queryset=Genre.objects.all())
        ).get(id=movie_id)
    except Movie.DoesNotExist:
        raise MovieNotFound()


def get_all_movies() -> QuerySet[Movie]:
    return (
        Movie.objects
        .prefetch_related(Prefetch("genres", queryset=Genre.objects.all()))
        .order_by("-id")
    )
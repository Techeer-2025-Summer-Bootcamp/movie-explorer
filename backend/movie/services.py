from django.db import transaction
from django.core.paginator import Paginator

from .models import Movie, Genre
from .selectors import get_all_movies, get_movie_by_id


class MovieService:
    @staticmethod
    def _attach_genres(movie: Movie, genre_names: list[str]) -> None:
        movie.genres.clear()
        for name in genre_names:
            genre, _ = Genre.objects.get_or_create(name=name)
            movie.genres.add(genre)


    def create(self, data: dict, poster_path: str) -> Movie:
        genres = data.pop("genres", [])
        data["poster_url"] = poster_path

        with transaction.atomic():
            movie = Movie.objects.create(**data)
            self._attach_genres(movie, genres)
        return {
            "id": movie.id,
            "title": movie.title,
            "overview": movie.overview,
            "poster_url": movie.poster_url,
            "release_date": movie.release_date,
            "rating": movie.rating,
            "genres": [g.name for g in movie.genres.all()],  # ⭐️ 이름만 전달
        }


    def get_movies_list(self):
        movies = get_all_movies()
        movie_list = []
        for movie in movies:
            movie_list.append({
                "id": movie.id,
                "title": movie.title,
                "overview": movie.overview,
                "poster_url": movie.poster_url,
                "release_date": movie.release_date,
                "rating": movie.rating,
                "genres": [genre.name for genre in movie.genres.all()]  # ✅ 리스트 변환
            })
        return movie_list


    def get_movie(self, *, movie_id: int) -> Movie:
        movie = get_movie_by_id(movie_id)
        return {
            "id": movie.id,
            "title": movie.title,
            "overview": movie.overview,
            "poster_url": movie.poster_url,
            "release_date": movie.release_date,
            "rating": movie.rating,
            "genres": [g.name for g in movie.genres.all()],
        }


    def update(self, *, movie_id: int, movie_dict: dict) -> Movie:
        movie = get_movie_by_id(movie_id)
        genres = movie_dict.pop("genres", None)

        with transaction.atomic():
            for field, value in movie_dict.items():
                setattr(movie, field, value)
            movie.save()
            if genres is not None:
                self._attach_genres(movie, genres)
        return {
            "id": movie.id,
            "title": movie.title,
            "overview": movie.overview,
            "poster_url": movie.poster_url,
            "release_date": movie.release_date,
            "rating": movie.rating,
            "genres": [genre.name for genre in movie.genres.all()],
        }


    def delete(self, *, movie_id: int) -> None:
        movie = get_movie_by_id(movie_id)
        movie.delete()

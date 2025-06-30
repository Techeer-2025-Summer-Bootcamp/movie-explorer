from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=255)  # 영화 제목
    overview = models.TextField()  # 영화 줄거리
    poster_url = models.CharField(max_length=255, null=True, blank=True)  # ← 문자열로 경로 저장
    release_date = models.DateField()  # 개봉일
    rating = models.FloatField()  # 평균 평점

    created_at = models.DateTimeField(auto_now_add=True)  # 생성 시 자동 저장
    updated_at = models.DateTimeField(auto_now=True)  # 수정 시 자동 갱신
    genres = models.ManyToManyField("Genre", through="MovieGenre", related_name="movies")

    def __str__(self):
        return self.title

    class Meta:
        db_table = "movie"


class Genre(models.Model):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        db_table = "genre"

    def __str__(self):
        return self.name


class MovieGenre(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)

    class Meta:
        db_table = "movie_genre"
        unique_together = ("movie", "genre")

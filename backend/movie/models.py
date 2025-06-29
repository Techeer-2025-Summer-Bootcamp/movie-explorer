from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=255)  # 영화 제목
    overview = models.TextField()  # 영화 줄거리
    poster_url = models.CharField(max_length=255)  # 포스터 이미지 경로
    release_date = models.DateField()  # 개봉일
    rating = models.FloatField()  # 평균 평점

    created_at = models.DateTimeField(auto_now_add=True)  # 생성 시 자동 저장
    updated_at = models.DateTimeField(auto_now=True)  # 수정 시 자동 갱신

    def __str__(self):
        return self.title
    
    class Meta:
        db_table = 'movie'

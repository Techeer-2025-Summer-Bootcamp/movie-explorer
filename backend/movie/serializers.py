from rest_framework import serializers



# 출력 시리얼라이저 - 영화 1개 조회
class MovieDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=255)
    overview = serializers.CharField()
    release_date = serializers.DateField()
    rating = serializers.FloatField(min_value=0, max_value=10)
    genres = serializers.ListField(child=serializers.CharField())


# 출력 시리얼라이저 - 영화 2개 이상 조회
class MovieListOutputSerializer(serializers.Serializer):
    movies = MovieDetailSerializer(many=True)


# 입력 시리얼라이저 - 생성/수정
class MovieInputSerializer(serializers.Serializer):
    title = serializers.CharField(required=False, max_length=255)
    overview = serializers.CharField(required=False)
    release_date = serializers.DateField(required=False)
    rating = serializers.FloatField(required=False, min_value=0, max_value=10)
    genres = serializers.ListField(child=serializers.CharField(max_length=255), allow_empty=False, required=False)

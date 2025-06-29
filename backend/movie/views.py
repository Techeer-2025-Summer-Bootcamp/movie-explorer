from rest_framework import generics
from drf_spectacular.utils import extend_schema
from datetime import datetime

from config.exceptions import MovieNotFound
from config.response import success_response, fail_response, error_response
from .services import MovieService
from .serializers import MovieDetailSerializer, MovieInputSerializer, MovieListOutputSerializer


class MovieRetrieveView(generics.GenericAPIView):
    serializer_class = MovieInputSerializer

    @extend_schema(summary="영화 목록 조회 API")
    @extend_schema(
        responses={200: success_response(MovieListOutputSerializer),
                   404: fail_response(MovieNotFound)},
    )    
    def get(self, request):
        movies = MovieService().get_movies_list()
        output_serializer = MovieListOutputSerializer({"movies": movies})
        return success_response(output_serializer.data)

    @extend_schema(summary="영화 정보 저장 API")
    @extend_schema(
        responses={200: success_response(MovieDetailSerializer)},
    )    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return fail_response(serializer.errors)

        data = serializer.validated_data
        poster_file = request.FILES.get("poster")

        poster_path = None
        if poster_file:
            save_dir = settings.POSTER_ROOT
            os.makedirs(save_dir, exist_ok=True)

            date_prefix = datetime.now().strftime('%y%m%d')
            filename = f"{date_prefix}_{poster_file.name}"
            full_path = os.path.join(save_dir, filename)

            with open(full_path, 'wb+') as destination:
                for chunk in poster_file.chunks():
                    destination.write(chunk)

            poster_path = f"posters/{filename}"

        movie = MovieService().create(data, poster_path)
        output_serializer = MovieDetailSerializer(movie)
        return success_response(output_serializer.data)




class MovieDetailView(generics.GenericAPIView):
    serializer_class = MovieInputSerializer

    @extend_schema(summary="영화 상세 정보 조회 API")
    @extend_schema(
        responses={200: success_response(MovieDetailSerializer),
                   404: fail_response(MovieNotFound)},
    )    
    def get(self, request, movie_id):
        movie = MovieService().get_movie(movie_id=movie_id)
        output_serializer = MovieDetailSerializer(movie)
        return success_response(output_serializer.data)

    @extend_schema(summary="영화 상세 정보 수정 API")
    @extend_schema(
        responses={200: success_response(MovieDetailSerializer),
                   404: fail_response(MovieNotFound)},
    )
    def patch(self, request, movie_id):
        serializer = self.get_serializer(data=request.data, partial=True)
        if not serializer.is_valid():
            return fail_response(serializer.errors)

        updated_movie = MovieService().update(movie_id=movie_id, movie_dict=serializer.validated_data)
        output_serializer = MovieDetailSerializer(updated_movie, context={"request": request})
        return success_response(output_serializer.data)
 

    @extend_schema(summary="특정 영화 삭제 API")
    @extend_schema(
        responses={200: success_response(data=None),
                   404: fail_response(MovieNotFound)},
    )
    def delete(self, request, movie_id):
        MovieService().delete(movie_id=movie_id)
        return success_response(data=None)
from rest_framework.exceptions import APIException
from rest_framework import status


class BadRequest(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "잘못된 요청입니다."
    default_code = "bad_request"


class NotFound(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "요청한 리소스를 찾을 수 없습니다."
    default_code = "not_found"


class MovieNotFound(NotFound):
    default_detail = {
        "field": "movieId",
        "code": "movie_not_found",
        "message": "영화 정보가 존재하지 않습니다.",
    }
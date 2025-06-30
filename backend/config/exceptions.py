from rest_framework import status
from rest_framework.exceptions import APIException


class FailException(APIException):
    status_code = 400


class ErrorException(APIException):
    status_code = 500


class MovieNotFound(FailException):
    status_code = 404 
    default_detail = "영화 정보가 존재하지 않습니다."
    default_code =  "movie_not_found"

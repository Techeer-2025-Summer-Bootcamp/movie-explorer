from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

docs_urlpatterns = [
    path("", SpectacularAPIView.as_view(), name="docs"),
    path("swagger/", SpectacularSwaggerView.as_view(url_name="docs"), name="swagger-ui"),
    path("redoc/", SpectacularRedocView.as_view(url_name="docs"), name="redoc"),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("movies/", include("movie.urls")),
]

FROM python:3.12-slim AS builder

ARG TZ

ENV DEBIAN_FRONTEND=noninteractive \
    TZ=${TZ} \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    pkg-config \
    libmariadb-dev-compat \
    git \
    curl \
    tzdata \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

FROM python:3.11-slim

ARG TZ

ENV DEBIAN_FRONTEND=noninteractive \
    TZ=${TZ}

RUN apt-get update && apt-get install -y --no-install-recommends \
    libmariadb-dev-compat \
    tzdata \
    gettext \
    libgl1 \
    libglib2.0-0 \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /home/movie/movie-backend-web

COPY --from=builder /usr/local/lib/python3.11/site-packages/ /usr/local/lib/python3.11/site-packages/

COPY . /home/movie/movie-backend-web/

RUN mkdir -p /home/movie/movie-backend-web/log/socket

COPY entry.sh /home/movie/movie-backend-web/entry.sh
RUN chmod +x /home/movie/movie-backend-web/entry.sh

COPY gunicorn_conf.py /home/movie/movie-backend-web/gunicorn_conf.py

CMD ["bash", "-c", "/home/movie/movie-backend-web/entry.sh"]
# ---------- build stage ----------
    FROM python:3.12.1 AS builder

    ARG TZ
    ENV PIP_NO_CACHE_DIR=1 \
        PIP_DISABLE_PIP_VERSION_CHECK=1 \
        TZ=${TZ}
    
    WORKDIR /app
    
    # OS 패키지 (빌드용)
    RUN apt-get update && apt-get install -y --no-install-recommends \
          build-essential pkg-config libmariadb-dev-compat git curl tzdata \
       && ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime \
       && echo ${TZ} > /etc/timezone \
       && apt-get clean && rm -rf /var/lib/apt/lists/*
    
    # Python 의존성
    COPY backend/requirements.txt .
    RUN pip install --upgrade pip && pip wheel --wheel-dir=/wheels -r requirements.txt
    
    # ---------- runtime stage ----------
    FROM python:3.12.1
    
    ARG TZ
    ENV PYTHONDONTWRITEBYTECODE=1 \
        PYTHONUNBUFFERED=1 \
        TZ=${TZ}
    
    # OS 패키지 (러UNTIME 최소)
    RUN apt-get update && apt-get install -y --no-install-recommends \
          libmariadb-dev-compat tzdata gettext libgl1 libglib2.0-0 \
       && ln -snf /usr/share/zoneinfo/${TZ} /etc/localtime \
       && echo ${TZ} > /etc/timezone \
       && apt-get clean && rm -rf /var/lib/apt/lists/*
    
    WORKDIR /app
    
    # 빌드한 wheel 복사-설치
    COPY --from=builder /wheels /wheels
    RUN pip install --no-index --find-links=/wheels /wheels/*
    
    # 소스 복사
    COPY backend /app
    
    # 기본 실행: 마이그레이션 → runsslserver
    CMD /bin/bash -c "python manage.py migrate && \
                      python manage.py runserver 0.0.0.0:8000"
    
    EXPOSE 8000
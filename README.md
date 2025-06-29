# 🎬 movie-explorer-backend

Django + DRF 기반의 영화 탐색 백엔드 API입니다.  
영화의 등록, 수정, 삭제, 상세조회 및 목록 조회 기능을 제공합니다.

---

## 📌 주요 기능

- 영화 등록 (포스터 업로드 포함)
- 영화 목록 조회
- 영화 상세 정보 조회
- 영화 정보 수정
- 영화 삭제
- Swagger 연동 (API 명세 자동화)

---

## 🛠️ 기술 스택

- Python 3.12
- Django 5.0.6
- Django REST Framework
- MySQL
- Swagger (drf-yasg)

---

## 📂 프로젝트 구조

```

backend/
├── config/               # Django 설정 파일
├── movie/                # 영화 도메인 관련 앱
├── posters/              # 업로드된 영화 포스터 이미지 저장 폴더
├── manage.py
├── secrets.json          # DB 및 시크릿 키 설정

````

---

## ⚙️ 환경 변수 설정 (`secrets.json`)

루트 디렉토리에 `secrets.json` 파일을 생성하여 작성해야 합니다.
---

## 🧪 설치 및 실행

```bash
# 1. 가상 환경 생성 및 활성화
python3 -m venv .venv
source .venv/bin/activate

# 2. 의존성 설치
pip install -r requirements.txt

# 3. 마이그레이션
python manage.py makemigrations
python manage.py migrate

# 4. 서버 실행
python manage.py runserver
```

---

## 📑 API 명세 (Swagger)

DRF + drf-yasg를 사용해 Swagger 문서를 제공합니다.

### 🔗 접속 경로:

```
http://localhost:8000/swagger/
```

---

## 📮 주요 엔드포인트

| 메서드    | 엔드포인트          | 설명       |
| ------ | -------------- | -------- |
| GET    | `/movies/`     | 영화 목록 조회 |
| POST   | `/movies/`     | 영화 등록    |
| GET    | `/movies/{id}` | 영화 상세 조회 |
| PATCH  | `/movies/{id}` | 영화 정보 수정 |
| DELETE | `/movies/{id}` | 영화 삭제    |

---

## 📎 참고 사항

* 포스터 파일은 `posters/` 폴더에 저장되며, DB에는 파일 경로만 저장됩니다.
* 미디어 서버 또는 CDN 연동이 필요한 경우 추가 설정이 필요합니다.

---

## 🧑‍💻 개발자

* Backend: [@dokyounglee](https://github.com/d0kyoung)


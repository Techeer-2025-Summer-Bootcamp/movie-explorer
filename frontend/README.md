# Movie Explorer Frontend 🎬

React + Vite + Tailwind CSS로 구현된 영화 리뷰 웹 애플리케이션입니다.

## 🚀 기능

- **영화 목록 조회**: 인기 영화 및 전체 영화 목록
- **영화 상세 정보**: 줄거리, 평점, 장르, 트레일러 등
- **영화 검색**: 제목으로 영화 검색
- **영화 추가**: 새 영화 등록 (제목, 개봉일, 평점, 장르, 줄거리)
- **영화 수정**: 평점 및 줄거리 수정
- **영화 삭제**: 영화 삭제 기능
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원

## 📁 프로젝트 구조

```
src/
├── api/                    # API 관련 모듈
│   ├── client.js          # Axios 클라이언트 설정
│   └── movies.js          # 영화 API 함수들
├── components/            # 재사용 가능한 컴포넌트
│   ├── AddMovieForm.jsx   # 영화 추가 폼
│   ├── LoadingSpinner.jsx # 로딩 스피너
│   ├── MovieCard.jsx      # 영화 카드
│   ├── MovieReview.jsx    # 영화 리뷰/수정
│   ├── Navbar.jsx         # 네비게이션 바
│   └── SearchBar.jsx      # 검색바
├── hooks/                 # 커스텀 훅
│   └── useMovies.js       # 영화 데이터 관리 훅
├── pages/                 # 페이지 컴포넌트
│   ├── HomePage.jsx       # 홈 페이지 (인기 영화)
│   ├── MoviesPage.jsx     # 영화 목록 페이지
│   └── MovieDetailPage.jsx # 영화 상세 페이지
├── App.jsx                # 메인 앱 컴포넌트
└── main.jsx               # 앱 진입점
```

## 🛠️ 기술 스택

- **React 19**: 사용자 인터페이스
- **Vite**: 빌드 도구 및 개발 서버
- **React Router**: 클라이언트 사이드 라우팅
- **Axios**: HTTP 클라이언트
- **Tailwind CSS**: 스타일링
- **PostCSS**: CSS 처리

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

### 3. 빌드

```bash
npm run build
```

## 📡 API 엔드포인트

백엔드 API와 연동하여 다음 기능을 제공합니다:

| 기능           | 메서드 | 경로                       | 설명                     |
| -------------- | ------ | -------------------------- | ------------------------ |
| 영화 목록 조회 | GET    | `/movies`                  | 전체 또는 인기 영화 목록 |
| 영화 추가      | POST   | `/movies`                  | 새 영화 등록             |
| 영화 상세 조회 | GET    | `/movies/{id}`             | ID로 영화 상세 정보      |
| 영화 수정      | PATCH  | `/movies/{id}`             | 평점, 줄거리 등 수정     |
| 영화 삭제      | DELETE | `/movies/{id}`             | 영화 삭제                |
| 영화 검색      | GET    | `/movies/search?q={query}` | 제목으로 검색            |

## 🎯 주요 컴포넌트

### MovieCard

영화 정보를 카드 형태로 표시하며, 삭제 버튼과 상세 보기 링크를 포함합니다.

### MovieReview

영화의 평점과 줄거리를 수정할 수 있는 컴포넌트입니다.

### AddMovieForm

새 영화를 추가하는 폼 컴포넌트입니다.

### SearchBar

영화 제목으로 검색할 수 있는 검색바입니다.

## 🔧 커스텀 훅

### useMovies

영화 목록 데이터를 관리하는 훅으로, 로딩 상태, 에러 처리, 검색 기능을 제공합니다.

### useMovie

개별 영화 데이터를 관리하는 훅으로, 영화 상세 정보를 가져오고 업데이트합니다.

## 🎨 스타일링

Tailwind CSS를 사용하여 반응형 디자인을 구현했습니다. 다크 모드도 지원합니다.

## 📱 반응형 디자인

- **모바일**: 1열 그리드
- **태블릿**: 2-3열 그리드
- **데스크톱**: 4-5열 그리드

## 🔄 상태 관리

React의 useState와 useEffect를 사용하여 컴포넌트 상태를 관리합니다. API 호출은 커스텀 훅으로 분리하여 재사용성을 높였습니다.

## 🚀 배포

빌드된 파일은 `dist` 폴더에 생성되며, 정적 파일 서버에 배포할 수 있습니다.

```bash
npm run build
npm run preview
```

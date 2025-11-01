# 🗳️ Talk and Vote - 투표 커뮤니티 플랫폼

> React + FastAPI 기반 실시간 투표 및 토론 플랫폼

[스크린샷: 메인 화면]

## 📌 프로젝트 소개

사용자들이 다양한 주제에 대해 투표하고 의견을 나눌 수 있는 커뮤니티 플랫폼입니다. AI 도구를 활용하며 React와 FastAPI를 학습하고 구현했습니다.

**개발 기간**: 2025.10 (위니브 AI Chatbot & RAG 기반 서비스 개발자 양성 과정)

## ✨ 주요 기능

- 📊 **투표 생성 및 참여**: 다양한 주제의 투표 생성 및 실시간 결과 확인
- 💬 **댓글 시스템**: 투표에 대한 의견 교환 및 토론
- 👤 **사용자 인증**: 회원가입, 로그인, 프로필 관리
- 🔍 **투표 검색 및 필터링**: 카테고리별, 인기순 투표 탐색

[스크린샷: 주요 기능]

## 🛠 기술 스택

### Frontend
- **React.js**: 사용자 인터페이스 구축
- **React Router**: 클라이언트 사이드 라우팅
- **Axios**: HTTP 클라이언트

### Backend
- **FastAPI**: RESTful API 서버
- **SQLAlchemy**: ORM (Object-Relational Mapping)
- **Pydantic**: 데이터 검증
- **SQLite/PostgreSQL**: 데이터베이스

### Development
- **AI 도구 활용**: Claude Code를 활용한 프론트엔드/백엔드 바이브 코딩

## 🏗 시스템 아키텍처

```
[React Frontend]
    ↓ HTTP/REST API
[FastAPI Backend]
    ↓ SQLAlchemy ORM
[Database (SQLite/PostgreSQL)]
```

## 🚀 설치 및 실행

### 1. 저장소 클론

```bash
git clone https://github.com/Griotold/talk-and-vote.git
cd talk-and-vote
```

### 2. 백엔드 설정 및 실행

```bash
cd backend

# 가상환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 패키지 설치
pip install -r requirements.txt

# 서버 실행
uvicorn main:app --reload
```

### 3. 프론트엔드 설정 및 실행

```bash
cd frontend

# 패키지 설치
npm install

# 개발 서버 실행
npm start
```

## 📖 사용 방법

1. 백엔드 서버 실행 (`http://localhost:8000`)
2. 프론트엔드 개발 서버 실행 (`http://localhost:3000`)
3. 브라우저에서 `localhost:3000` 접속
4. 회원가입 후 투표 생성 및 참여

## 💡 핵심 학습 내용

### React 프론트엔드
- 컴포넌트 기반 설계 및 상태 관리
- React Hooks (useState, useEffect, useContext)
- RESTful API 연동
- 라우팅 및 네비게이션

### FastAPI 백엔드
- RESTful API 설계 및 구현
- SQLAlchemy ORM을 활용한 데이터베이스 관리
- Pydantic을 사용한 데이터 검증
- CORS 설정 및 인증/인가

### AI 도구 활용 개발
- Claude Code를 활용한 빠른 프로토타이핑
- AI 도움을 받으며 새로운 기술 스택 학습
- 프론트엔드와 백엔드를 동시에 학습하며 풀스택 구현

## 🔧 주요 API 엔드포인트

```
POST   /api/auth/register     # 회원가입
POST   /api/auth/login        # 로그인
GET    /api/votes             # 투표 목록 조회
POST   /api/votes             # 투표 생성
GET    /api/votes/{id}        # 투표 상세 조회
POST   /api/votes/{id}/vote   # 투표 참여
POST   /api/comments          # 댓글 작성
```

## 📝 프로젝트 구조

```
talk-and-vote/
├── frontend/
│   ├── src/
│   │   ├── components/    # React 컴포넌트
│   │   ├── pages/        # 페이지 컴포넌트
│   │   ├── services/     # API 통신
│   │   └── App.js
│   └── package.json
├── backend/
│   ├── main.py           # FastAPI 메인 앱
│   ├── models.py         # 데이터베이스 모델
│   ├── schemas.py        # Pydantic 스키마
│   ├── routes/           # API 라우트
│   └── requirements.txt
└── README.md
```

## 🔮 향후 개선 사항

- [ ] 실시간 투표 결과 업데이트 (WebSocket)
- [ ] 투표 만료 기능
- [ ] 이미지/파일 첨부 기능
- [ ] 소셜 로그인 (Google, GitHub)
- [ ] 투표 통계 및 분석 대시보드
- [ ] 모바일 반응형 UI 개선

## 👤 개발자

**조해성**
- GitHub: [@Griotold](https://github.com/Griotold)
- Blog: [griotold.tistory.com](https://griotold.tistory.com)

## 📄 라이센스

MIT License

---

**위니브 AI Chatbot & RAG 기반 서비스 개발자 양성 과정** 프로젝트

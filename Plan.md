# Secret Propose - 개발 계획

## 프로젝트 목적

여자친구에게 프로포즈를 위한 웹 페이지 제작

---

## 페이지 구성

### 1. 카드 뉴스 페이지 (추억 회고)

- **형태**: 카드 뉴스 (한 장씩 넘기는 방식)
- **카드 전환**: 버튼 클릭 (이전/다음)
- **카드 프레임 구성**:
  - 이미지
  - 타이틀 (날짜 + 장소)
  - 회고 글 (그 당시에 대한 이야기)
- 추억할 내용마다 프레임 1개씩 생성
- 마지막 카드 이후 → 이벤트 홈페이지로 이동하는 버튼 표시
- **데이터**: 우선 더미 데이터로 구성, 이후 실제 내용으로 교체

### 2. 이벤트 홈페이지 (프로포즈)

- **배경 음악**: 노래 자동 재생
- **편지**: 편지 내용 표시 (우선 더미 텍스트, 이후 교체)
- **버튼 2개**:
  - **"네"** 버튼: 정상 클릭 가능
  - **"아니요"** 버튼: 마우스 커서가 근처에 접근하면 버튼이 이리저리 도망다님
- **"네" 클릭 이후**: 미정 (추후 기획 예정)

---

## 기술 스택

- **Backend**: Kotlin + Spring Boot
- **Frontend**: Vue 3 + Vite (SPA)
- **프론트엔드 배포**: Vercel (무료 정적 호스팅, GitHub 연동 자동 배포)
- **서버 배포**: Oracle Cloud Always Free (VM.Standard.E2.1.Micro, JAR 직접 실행)
- **DB**: H2 (필요 시)
- **반응형**: 모바일 친화적 디자인 (Responsive Web)

### 프론트엔드 구성

- **Vite + Vue 3**: 빠른 개발 환경, SPA 라우팅
- **Vue Router**: 카드 뉴스 페이지 ↔ 이벤트 페이지 전환
- **빌드 출력**: `src/main/resources/static/` → Spring Boot가 정적 파일로 서빙
- **개발 서버**: Vite dev server (HMR 지원)

### 모바일 대응

- 반응형 레이아웃 (미디어 쿼리 + flexbox/grid)
- 모바일 뷰포트 최적화
- 터치 이벤트 지원
- "아니요" 버튼: 모바일에서는 터치(탭) 시도 시 버튼이 도망가도록 처리

---

## 파일 구조 (예정)

```
frontend/                    # Vue 프로젝트 루트
├── package.json
├── vite.config.js
├── index.html
├── public/
│   ├── images/              # 추억 이미지
│   └── music/               # 배경 음악 파일
└── src/
    ├── App.vue
    ├── main.js
    ├── router/
    │   └── index.js         # Vue Router 설정
    ├── views/
    │   ├── CardNewsView.vue  # 카드 뉴스 페이지
    │   ├── EventView.vue     # 이벤트(프로포즈) 페이지
    │   └── CelebrationView.vue # 축하 페이지 (파티클 애니메이션)
    ├── components/
    │   ├── CardFrame.vue     # 카드 프레임 컴포넌트
    │   ├── LetterContent.vue # 편지 컴포넌트
    │   └── RunawayButton.vue # 도망다니는 "아니요" 버튼
    ├── data/
    │   └── memories.js       # 카드 뉴스 더미 데이터
    └── assets/
        └── styles/
            └── main.css      # 공통 스타일
```

---

## 구현 순서

1. [x] Vue 3 + Vite 프로젝트 세팅 (frontend 폴더)
2. [x] Vue Router 설정 (카드 뉴스 ↔ 이벤트 페이지)
3. [x] 카드 뉴스 페이지 구현 (CardNewsView + CardFrame 컴포넌트)
4. [x] 이벤트 페이지 구현 (편지 + 배경 음악)
5. [x] "아니요" 버튼 도망 로직 (RunawayButton 컴포넌트, 모바일 터치 대응 포함)
6. [x] 반응형 디자인 적용 (모바일 최적화)
7. [x] Vite 빌드 → Spring Boot static 연동 (설정 완료)
8. [x] "네" 버튼 클릭 후 동작 → 축하 페이지 (CelebrationView)
9. [ ] 더미 데이터 → 실제 데이터 교체

---

## 추가 개발 예정 (프론트엔드)

- [x] Vercel 배포 설정 (vercel.json, build:vercel 스크립트, SPA 리라이트)
- [x] "네" 버튼 클릭 후 화면 (Canvas 파티클 애니메이션 + 순차 텍스트 등장)
- [x] 배경 음악 전역화 (composable로 페이지 전환 시 끊김 방지)
- [x] 카드 뉴스 모바일 스와이프 제스처
- [x] OG 메타 태그 + Favicon + theme-color
- [x] 404 리다이렉트 라우트
- [ ] 카드 뉴스 실제 콘텐츠 교체 (이미지, 날짜, 장소, 회고 글)
- [ ] 편지 실제 내용 교체
- [ ] 배경 음악 파일 추가 (`public/music/bgm.mp3`)
- [ ] 추억 이미지 파일 추가 (`public/images/`)
- [x] 디자인/UX 디테일 보완 (밝은 테마, 나눔명조 폰트, 편지 스크롤, 음악 토글, 다중 사진 UI 등)
- [x] 프론트엔드 → 서버 API 연동 (하드코딩 데이터를 API 호출로 교체)
- [x] TextGuide.md + generate-data.js (콘텐츠 파싱 → data.sql 자동 생성)
- [x] 카드 뉴스 다중 사진 (인디케이터, 좌우 화살표, TextGuide `- 사진:` 필드)

### 카드 뉴스 다중 사진 상세

| 조건 | 좌측 버튼 | 우측 버튼 | 점 인디케이터 |
| --- | --- | --- | --- |
| 사진 1장 | 숨김 | 숨김 | 숨김 |
| 사진 2장 이상 | 첫 사진이 아니면 표시 | 마지막이 아니면 표시 | 표시 |

### TextGuide `- 사진:` 필드 상세

- **형식**: 파일명 또는 전체 URL을 쉼표로 구분
- **파일명** (예: `memory-1a.jpg`): `/images/` 접두사 자동 추가
- **전체 URL** (`http`로 시작): 그대로 사용 (테스트용 picsum 등)

### API 연동 상세

- **서버 응답 코드**: `code: "0000"` (ResultCode.SUCCESS)
- **프론트엔드 검증**: `api/index.js`에서 `json.code !== '0000'`이면 에러 처리, 폴백 데이터 사용

---

## 서버 개발 계획 (Kotlin + Spring Boot)

### 목적

프론트엔드에 하드코딩된 데이터를 서버 API로 관리하고, 프로포즈 수락/방문 등 이벤트를 기록한다.

### API 목록

| Method | URL | 설명 |
| --- | --- | --- |
| `GET` | `/api/memories` | 카드 뉴스 목록 조회 (정렬순) |
| `GET` | `/api/letter` | 편지 내용 조회 |
| `POST` | `/api/propose/accept` | 프로포즈 수락 기록 (날짜/시간/UA 저장) |
| `GET` | `/api/propose/status` | 프로포즈 수락 여부 + 수락 시각 조회 |
| `POST` | `/api/visit` | 페이지 방문 기록 |

### Entity 설계

#### Memory (카드 뉴스)
| 필드 | 타입 | 설명 |
| --- | --- | --- |
| id | Long (PK) | 자동 생성 |
| date | String | 날짜 (예: "2024.01.01") |
| place | String | 장소 |
| title | String | 제목 |
| description | String | 회고 글 |
| imagePath | String | 이미지 경로 (단일: `"/images/a.jpg"`, 다중: JSON 배열 `["/images/a.jpg","/images/b.jpg"]`) |
| sortOrder | Int | 정렬 순서 |

#### Letter (편지)
| 필드 | 타입 | 설명 |
| --- | --- | --- |
| id | Long (PK) | 자동 생성 |
| greeting | String | 인사말 (예: "사랑하는 당신에게") |
| closing | String | 맺음말 |
| paragraphs | String (TEXT) | 본문 (JSON 배열 형태) |

#### ProposeLog (프로포즈 기록)
| 필드 | 타입 | 설명 |
| --- | --- | --- |
| id | Long (PK) | 자동 생성 |
| acceptedAt | LocalDateTime | 수락 시각 |
| userAgent | String | 브라우저 정보 |

#### VisitLog (방문 기록)
| 필드 | 타입 | 설명 |
| --- | --- | --- |
| id | Long (PK) | 자동 생성 |
| page | String | 방문 페이지 (/, /event, /celebration) |
| visitedAt | LocalDateTime | 방문 시각 |
| userAgent | String | 브라우저 정보 |

### 서버 구현 순서

1. [x] CORS 설정 (Vercel 프론트엔드 도메인 허용)
2. [x] Memory Entity + Repository + Service + Controller
3. [x] Letter Entity + Repository + Service + Controller
4. [x] ProposeLog Entity + Repository + Service + Controller
5. [x] VisitLog Entity + Repository + Service + Controller
6. [x] 초기 데이터 설정 (data.sql)
7. [x] 프론트엔드 API 연동 (memories.js → API 호출, LetterContent → API 호출)
8. [x] 서버 배포 (Oracle Cloud — JAR 직접 실행)

### 기술 사항

- **DB**: H2 (파일 모드 — 서버 재시작 시에도 데이터 유지)
- **CORS**: Vercel 배포 도메인 + localhost 허용
- **응답 형식**: 기존 `ApiResponse` 공통 응답 사용
- **예외 처리**: 기존 `GlobalExceptionHandler` + `ResultCode` 사용

---

## 콘텐츠 저장 방식

### 저장 위치 구분

| 콘텐츠 | 저장 위치 | 이유 |
| --- | --- | --- |
| 사진 (추억 이미지) | `frontend/public/images/` | 정적 파일 → Vercel CDN 서빙, 빠르고 단순 |
| 배경 음악 | `frontend/public/music/` | 정적 파일 → Vercel CDN 서빙 |
| OG 썸네일 | `frontend/public/images/` | 링크 공유 미리보기용 정적 이미지 |
| 카드 뉴스 텍스트 (날짜, 장소, 제목, 회고 글) | H2 DB (Memory 테이블) | 서버 API로 관리, 코드 수정 없이 변경 가능 |
| 편지 텍스트 (인사말, 본문, 맺음말) | H2 DB (Letter 테이블) | 서버 API로 관리, 코드 수정 없이 변경 가능 |
| 프로포즈 수락/방문 기록 | H2 DB (ProposeLog, VisitLog) | 이벤트 로그 영구 저장 |

### 정적 파일 경로 규칙

```
frontend/public/
├── images/
│   ├── memory-001.jpg        # 추억 사진 (카드 뉴스용, 3자리 0패딩)
│   ├── memory-002.jpg
│   ├── ...
│   └── og-thumbnail.png      # 링크 공유 시 미리보기 썸네일
└── music/
    └── bgm.mp3               # 이벤트 페이지 배경 음악
```

- 이미지 파일명: `memory-001.jpg` 형식 (3자리 0패딩). 변환: `scripts/convert-images.js convert` (HEIC→JPG), `rename` (memory-NNN)
- 프론트엔드에서 이미지 접근: Vercel 정적 서빙 (`https://도메인/images/memory-1.jpg`)
- 사진은 Git 레포에 포함되며, push 시 Vercel에 자동 배포

### DB 텍스트 데이터 (TextGuide.md → data.sql)

카드 뉴스와 편지 텍스트는 **TextGuide.md**에 작성한 뒤 `npm run generate:data` 실행 시 `src/main/resources/data.sql`이 자동 생성된다.

**워크플로우**: TextGuide.md 수정 → `npm run generate:data` → data.sql 생성 → 서버 빌드/배포

### 배포 워크플로우 ("배포해")

1. `npm run generate:data` — TextGuide 내용을 data.sql로 반영
2. main 브랜치에 feature 병합 (squash merge)
3. `./deploy.sh` — 서버 JAR 빌드·전송·재시작
4. `git push origin main` — Vercel 자동 배포 트리거

### 준비물 체크리스트

- [x] 추억 사진 파일 (`memory-001.jpg`~`memory-087.jpg`) → `frontend/public/images/`에 추가
- [ ] 배경 음악 파일 (`bgm.mp3`) → `frontend/public/music/`에 추가 (선택)
- [ ] OG 썸네일 이미지 (`og-thumbnail.png`) → `frontend/public/images/`에 추가
- [ ] TextGuide.md에 카드 뉴스·편지 내용 작성 후 `npm run generate:data` 실행

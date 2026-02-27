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
- **배포**: Vercel (무료 정적 호스팅, GitHub 연동 자동 배포)
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

## 추가 개발 예정

- [x] Vercel 배포 설정 (vercel.json, build:vercel 스크립트, SPA 리라이트)
- [x] "네" 버튼 클릭 후 화면 (Canvas 파티클 애니메이션 + 순차 텍스트 등장)
- [ ] 카드 뉴스 실제 콘텐츠 교체 (이미지, 날짜, 장소, 회고 글)
- [ ] 편지 실제 내용 교체
- [ ] 배경 음악 파일 추가 (`public/music/bgm.mp3`)
- [ ] 추억 이미지 파일 추가 (`public/images/`)
- [x] 배경 음악 전역화 (composable로 페이지 전환 시 끊김 방지)
- [x] 카드 뉴스 모바일 스와이프 제스처
- [x] OG 메타 태그 + Favicon + theme-color
- [x] 404 리다이렉트 라우트
- [ ] 디자인/UX 디테일 보완 (애니메이션, 색상, 폰트 등)

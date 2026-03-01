# Onboard

## 프로젝트 개요

- **성격**: 간단한 토이 프로젝트
- **스택**: Kotlin + Spring Boot / Vue 3 + Vite
- **영역**: Server, WebApplication 함께 진행
- **DB**: H2

### 개발 환경
- **JDK**: Java 21 (설치 완료)
- **Node.js**: 프론트엔드 빌드 (Vite + Vue 3)

### 배포
- **프론트엔드**: Vercel (GitHub 연동 자동 배포, main 브랜치)
  - **설정 파일**: `vercel.json` (SPA 리라이트)
  - **빌드 스크립트**: `npm run build:vercel` → `frontend/dist` 출력
  - **접근**: PC / 모바일 / 태블릿 모두 공개 URL로 접근 가능
- **서버**: Oracle Cloud (Always Free, VM.Standard.E2.1.Micro)
  - **Public IP**: `168.107.12.237`
  - **OS**: Oracle Linux 9 (x86_64)
  - **SSH 유저**: `opc`
  - **SSH 키**: `~/Downloads/ssh-key-2026-02-28.key`
  - **배포 방식**: JAR 직접 실행 (`deploy.sh` 스크립트)
  - **상태**: 배포 완료 (API `http://168.107.12.237:8080/api/memories` 동작 확인)

### 브랜치 전략 (Git-Flow)
- **main**: 프로젝트 동작을 위한 최소한의 코드만 유지
- **develop**: 실제 개발 작업 진행 브랜치
- **feature/web**: 프론트엔드(Vue) 기능 개발
- **feature/server**: 백엔드(Spring Boot) 기능 개발

### 프로젝트 구조

```
src/main/kotlin/com/secret/propse/
├── Application.kt
├── common/           # ApiResponse, BaseController, ResultCode
├── config/
├── controller/
├── dto/
├── entity/
├── exception/        # BusinessException, GlobalExceptionHandler
├── repository/
└── service/

frontend/                # Vue 3 + Vite (SPA)
├── src/
│   ├── views/           # 페이지 컴포넌트
│   ├── components/      # 공통 컴포넌트
│   ├── composables/     # 공유 상태 (useMusic 등)
│   ├── api/             # API 서비스 모듈
│   ├── router/          # Vue Router
│   └── data/            # 폴백 데이터 파일
└── public/              # 정적 리소스 (이미지, 음악)
```

### 서버 실행
- **명령어**: `./gradlew bootRun`
- **포트**: 8080 (기본)
- **확인 URL**: `http://localhost:8080/` (index.html), `http://localhost:8080/api/test`, `http://localhost:8080/h2-console`

### 프론트엔드 실행
- **명령어**: `cd frontend && npm run dev`
- **포트**: 5173 (기본)
- **확인 URL**: `http://localhost:5173/` (초기 화면), `http://localhost:5173/cards` (카드 뉴스), `http://localhost:5173/event` (이벤트), `http://localhost:5173/celebration` (축하)
- **모바일 확인**: `host: true` 설정으로 같은 Wi-Fi 내 모바일 접속 가능

### 콘텐츠 저장 방식
- **사진/음악**: `frontend/public/` 폴더 (정적 파일, Vercel CDN 서빙)
- **텍스트 (카드 뉴스, 편지)**: `TextGuide.md` 작성 → `npm run generate:data` → `data.sql` 생성 → H2 DB
- **이벤트 로그 (수락, 방문)**: H2 DB (영구 저장)
- **이미지 파일명 규칙**: `memory-001.jpg`, `memory-002.jpg` ... (3자리 0 패딩). TextGuide `- 사진:` 필드로 다중 지정 가능. DB `image_path`에 JSON 배열 저장
- **이미지 변환 스크립트**: `scripts/convert-images.js` — HEIC/PNG→JPG 변환(`convert`), memory-N→memory-NNN 이름 변경(`rename`)
- **배포 워크플로우 ("배포해")**: TextGuide 반영 → main 병합 → `./deploy.sh` → `git push main` (Vercel 트리거)

### 초기 구성 (main 브랜치)
- TestController: `GET /api/test` API
- index.html: 루트 welcome 페이지
- .gitignore: Gradle, IDE, 빌드 산출물 제외
- GitConvention.md: 커밋 메시지 규칙

---

## 개발 진행 상황

### feature/web - 프론트엔드 (Vue 3 + Vite)

| 항목 | 상태 |
| --- | --- |
| Vue 3 + Vite 프로젝트 세팅 | ✅ 완료 |
| Vue Router 설정 (`/` → 초기 화면, `/cards` → 카드 뉴스, `/event` → 이벤트) | ✅ 완료 |
| 카드 뉴스 페이지 (CardNewsView + CardFrame) | ✅ 완료 (더미 데이터) |
| 이벤트 페이지 (편지 + 배경 음악 + 프로포즈) | ✅ 완료 (더미 내용) |
| "아니요" 버튼 도망 로직 (PC 호버 + 모바일 터치) | ✅ 완료 |
| 반응형 디자인 (모바일 대응) | ✅ 완료 |
| Vite 빌드 → Spring Boot static 연동 설정 | ✅ 완료 (설정만) |
| "네" 버튼 클릭 → 축하 페이지 (CelebrationView) | ✅ 완료 |
| Vercel 배포 설정 (vercel.json + build:vercel) | ✅ 완료 |
| 배경 음악 전역화 (페이지 전환 시 끊김 방지) | ✅ 완료 |
| 카드 뉴스 스와이프 제스처 (모바일 좌우 스와이프) | ✅ 완료 |
| OG 메타 태그 + Favicon (링크 공유 미리보기) | ✅ 완료 |
| 404 리다이렉트 (잘못된 경로 → 초기 화면) | ✅ 완료 |
| API 연동 모듈 (api/index.js — 서버 API 호출) | ✅ 완료 |
| CardNewsView API 연동 (로컬 폴백 포함) | ✅ 완료 |
| LetterContent API 연동 (인사말/본문/맺음말 동적) | ✅ 완료 |
| EventView 프로포즈 수락 API 연동 | ✅ 완료 |
| 페이지 방문 기록 API 연동 (전 페이지) | ✅ 완료 |
| 환경별 API URL 분리 (.env.production/development) | ✅ 완료 |
| UI 밝은 테마 (크림/노란색 계열) | ✅ 완료 |
| 편지 영역 스크롤 지원 | ✅ 완료 |
| 음악 없어도 편지 화면 정상 진입 | ✅ 완료 |
| TextGuide.md + generate-data.js (콘텐츠 파싱 → data.sql) | ✅ 완료 |
| 카드 뉴스 다중 사진 (인디케이터, 좌우 화살표) | ✅ 완료 |
| API 응답 코드 검증 수정 (0000) | ✅ 완료 |
| 이미지 변환 스크립트 (HEIC→JPG, memory-NNN 형식) | ✅ 완료 |
| 추억 사진 실제 파일 추가 (87장, memory-001~087.jpg) | ✅ 완료 |
| memories.js 폴백 데이터 picsum → 프로젝트 이미지로 수정 (Vercel 배포 시 랜덤 사진 이슈 해결) | ✅ 완료 |
| 카드 뉴스 사진 영역만 표시 (날짜/제목/설명 영역 숨김) | ✅ 완료 |
| 카드 1개 + 사진 87장 구조 (TextGuide `1-87` 범위, generate-data 확장, memories.js 폴백) | ✅ 완료 |
| 초기 화면 (IntroView, "당신을 위해 준비했어요" + 시작하기 → /cards) | ✅ 완료 |
| 카드 뉴스 UI 개선 (사진 wrap_content, 뒷배경 #e6e2d5, 내비 버튼 사진 바깥 배치, 문구 영역 날짜/장소 세로 정렬) | ✅ 완료 |

### 카드 뉴스 다중 사진 UI 규칙

- **사진 1장**: 좌우 버튼·점 인디케이터 모두 숨김
- **사진 2장 이상**: 점 인디케이터 표시. 좌측 버튼은 첫 사진이 아닐 때만, 우측 버튼은 마지막 사진이 아닐 때만 표시
- **API 응답 코드**: 서버 `ResultCode.SUCCESS.code`는 `"0000"`. 프론트엔드 `api/index.js`에서 `json.code === '0000'`으로 검증

### feature/server - 백엔드 (Kotlin + Spring Boot)

| 항목 | 상태 |
| --- | --- |
| H2 파일 모드 + JPA 설정 (application.yaml) | ✅ 완료 |
| CORS 설정 (Vercel + localhost 허용) | ✅ 완료 |
| Memory Entity/Repository/Service/Controller | ✅ 완료 |
| Letter Entity/Repository/Service/Controller | ✅ 완료 |
| ProposeLog Entity/Repository/Service/Controller | ✅ 완료 |
| VisitLog Entity/Repository/Service/Controller | ✅ 완료 |
| 초기 데이터 (data.sql — 더미 데이터) | ✅ 완료 |
| JAR 빌드 + 배포 스크립트 (deploy.sh) | ✅ 완료 |
| Oracle Cloud 인스턴스 생성 | ✅ 완료 |
| 서버 Java 21 설치 + 배포 | ✅ 완료 |

---

## 개발 규칙

### 코드 스타일

#### Controller
- 불필요한 주석 제거 (Javadoc, 설명 주석 등)
- 단순히 Service를 호출하고 응답을 반환하는 역할만 수행
- `BaseController`의 `success()`, `successList()` 메서드 사용

#### Service
- **한 메서드 = 한 역할** 원칙 준수
- 단순 설명을 위한 주석은 작성하지 않음
- 섹션 구분 주석(`// ==================================================`)만 허용
- 반복되는 문자열은 상수로 추출
- 매직 넘버는 상수화

#### Spring Bean 주석 규칙
Service 클래스의 Bean 주입부에 역할별 주석 추가:
```
// Dto <-> Condition
private final XxxConditionMapper xxxConditionMapper;

// Entity <-> Dto
private final XxxEntityMapper xxxEntityMapper;

// Condition <-> DB
private final XxxMapper xxxMapper;

// 암,복호화
private final AES256Cipher aes256Cipher;

// Entity 공통 유틸리티
private final EntityUtils entityUtils;

// DTO 공통 유틸리티
private final DtoUtils dtoUtils;

// 파일 서비스
private final FileService fileService;
```

### 네이밍 규칙

#### 상수
- 대문자 + 언더스코어 (예: `USER_TYPE_RESIDENT`, `STATUS_AGREE`)

#### DTO 필드명 (타임스탬프)
- 생성 일시: `createdTs` (기존 `createTs`에서 변경)
- 수정 일시: `updatedTs` (기존 `updateTs`에서 변경)

#### 메서드명
- 조회: `fetch*`, `find*`, `get*`
- 변환: `to*Dto`, `to*Entity`
- 등록: `register*`
- 수정: `update*`
- 삭제: `delete*`, `withdraw*`
- 유틸: `is*`, `parse*`, `build*`

### 코드 생성 및 수정 기준

앞으로 코드를 새로 만들거나 수정할 때 아래 기준을 따른다.

#### 공통화
- **기존 공통 요소 우선 사용**: `ExcelUtil`, `FileService`, `EntityUtils`, `UploadReportDto` 등 이미 있는 유틸/서비스/DTO를 먼저 사용한다.
- **2곳 이상 동일 패턴**: 같은 로직이 두 곳 이상이면 공통 메서드·유틸로 추출을 검토한다. (예: 엑셀 셀 읽기는 `ExcelUtil.getCellAsLong`, `getCellAsLocalDate` 등)
- **과한 공통화 지양**: 추상화 단계가 과하면 유지보수가 어려우므로, 공통화는 "명확히 반복"되는 부분에만 적용한다. 스파게티 코드·과도한 추상화는 하지 않는다.

#### 최적화
- **조회 횟수**: 행/건마다 DB 조회가 반복되면 N이 커질 때 부담이 되므로, 필요 시 일괄 조회·캐시·Condition 조건 보강(예: 일자 범위) 등을 검토한다.
- **필요 시에만**: 성능 이슈가 예상되거나 실제로 발생한 경우에 최적화를 적용한다. 미리 과한 최적화는 하지 않는다.

#### 일관성
- **동일 기능은 동일 패턴**: 같은 성격의 기능(예: 엑셀 일괄 업로드)은 파일 내 중복·DB 중복 검사, 예외 처리, 응답 구조 등을 서로 맞춰 일관되게 둔다.
- **네이밍·규격**: 상수/파일명/API 규격 등은 기존 Onboard·네이밍 규칙·연동규격을 따른다.

#### 예외 및 메시지
- **ResultCode 사용**: 예외 발생 시 클라이언트에 내려줄 메시지는 별도 문구가 아니라 **`ResultCode`의 `description`**을 사용한다.

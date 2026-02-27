# Onboard

## 프로젝트 개요

- **성격**: 간단한 토이 프로젝트
- **스택**: Kotlin + Spring Framework
- **영역**: Server, WebApplication 함께 진행
- **DB**: H2

### 개발 환경
- **JDK**: Java 21 (설치 완료)

### 브랜치 전략 (Git-Flow)
- **main**: 프로젝트 동작을 위한 최소한의 코드만 유지
- **develop**: 실제 개발 작업 진행 브랜치

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

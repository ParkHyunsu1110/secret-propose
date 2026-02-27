# Git Commit Message Convention

## 1. 형식

### 1.1 첫 줄
- `[이름]` 필수. `[#이슈번호]` 선택.

### 1.2 본문
- 타입 + `:` + 공백 + 설명.
- 상세가 필요하면 다음 줄에 들여쓰기 후 `1. 2. 3.` 나열.

### 1.3 원칙
- "무엇을", "왜" 변경했는지 작성. "어떻게"보다 목적 중심.
- 일관된 표현 사용.

## 2. 타입

| 타입 | 설명 |
| --- | --- |
| Feat | 기능 추가 |
| Modify | 기능 수정 |
| Refactor | 리팩토링 |
| CleanUp | 코드 정리(위치/import 등), 동작 변경 없음 |
| Remove | 파일·패키지 삭제 |
| Chore | 빌드·설정 변경 |
| Docs | 문서 수정 |
| Fix / Hotfix | 버그 수정(긴급 시 Hotfix) |
| Test | 테스트 변경 |
| Rename | 파일·패키지명 변경 |
| Move | 파일 위치 변경 |
| Comment | 주석 추가 |
| Etc | 위에 해당 없는 기타 |

## 3. 예시

```
[박현수]
Refactor: AttachmentFileService 공지 영역 제거 및 단일 첨부 메소드 추가
1. 공지 첨부파일 코드·주석 삭제
2. saveAttachment(parentKey, attachment, AttachmentTargetType) 추가
3. GitConvention·Onboard 보완
```

```
[박현수]
Feat: 직원 등록 API에 ID 자동 생성 로직 추가
```

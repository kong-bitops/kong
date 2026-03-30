# HoopSole Compare

플레이 스타일 기반으로 현대 농구화와 레트로 농구화를 비교/추천하는 Windows 유틸리티 앱입니다.

## GitHub Repository 구조

```text
GitHub Repository
├─ src/        # 소스코드
├─ release/    # 실행파일 (exe) 또는 Release
├─ deps/       # 종속 패키지 / DLL
└─ README.md
```

## README.md 필수 내용

### 1) 실행 환경 (Windows 버전 등)

- OS: Windows 10/11 (x64)
- Node.js: 22.x 권장
- npm: 10.x 이상

### 2) 설치 절차 (종속 패키지 설치 명령어)

```bash
npm install
```

### 3) 실행 방법 (단계별)

1. 개발 실행
```bash
npm run dev
```

2. 빌드
```bash
npm run build
```

3. exe 패키징
```bash
npm run package
```

4. 결과물 확인
- 설치형: `release/HoopSole Compare Setup 0.1.0.exe`
- 포터블: `release/HoopSole Compare 0.1.0.exe`

### 4) 관리자 권한 필요 여부

- 개발 실행: 일반 권한으로 가능
- 빌드/패키징: 일반 권한으로 가능
- 설치형 exe 실행: 관리자 권한(UAC 승인) 필요
- 포터블 exe 실행: 관리자 권한 요청될 수 있음 (`requireAdministrator` 적용)

## 권한/배포 설정 요약

- `requestedExecutionLevel: requireAdministrator`
- NSIS `perMachine: true`
- NSIS `allowElevation: true`
- `portable` 타겟 포함

## 이번 수정 반영 사항

- 농구화 데이터 대폭 확장 (모델 수 증가)
- 비교 화면에서 선택 불가 문제 수정
- 신발 탐색 카드 이미지 표시 추가
- 비교 화면에 선택된 농구화 이미지 표시
- 레트로/현대 기준: `releaseYear < 2000 => retro`, `>= 2000 => modern`

## 핵심 기능

- 현대/레트로 농구화 DB 탐색 및 필터
- 2~3개 모델 성능 비교 (레이더 차트 + 표)
- 플레이어 프로필 기반 점수 추천
- 즐겨찾기/추천 기록 로컬 저장(SQLite)
- CSV 내보내기, 비교 화면 PNG 저장
- 한국어/영어 전환 지원
- 모델 이미지 표시
# kong

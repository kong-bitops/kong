# HoopSole Compare

플레이 스타일 기반으로 현대 농구화와 레트로 농구화를 비교/추천하는 Windows 유틸리티 앱입니다.

## GitHub Repository 구조

```text
GitHub Repository
├─ src/        # 소스코드
├─ release/    # 실행파일 (exe)
├─ deps/       # 종속 패키지 / DLL 보관용
├─ RELEASE.md  # Git Release 노트
└─ README.md
```

## 실행 환경

- OS: Windows 10/11 (x64)
- Node.js: 24.x
- npm: 11.x

## 설치 절차

```bash
npm install
```

## 실행 방법

1. 개발 실행
```bash
npm run dev
```

2. 빌드
```bash
npm run build
```

3. 실행파일 생성 (portable)
```bash
npm run package
```

4. 결과물
- `release/HoopSole Compare Setup 0.1.0.exe`

## 관리자 권한 필요 여부

- 개발 실행: 관리자 권한 불필요
- 빌드/패키징: 관리자 권한 불필요
- EXE 실행: 관리자 권한 불필요 (`asInvoker`)

## 권한/배포 설정 요약

- `requestedExecutionLevel: asInvoker`
- 대상: Windows `portable` 실행 파일

## 핵심 기능

- 현대/레트로 농구화 DB 탐색 및 필터
- 2~3개 모델 성능 비교 (레이더 차트 + 표)
- 플레이어 프로필 기반 점수 추천
- 즐겨찾기/추천 기록 로컬 저장(SQLite)
- CSV 내보내기, 비교 화면 PNG 저장
- 한국어/영어 전환 지원
- 모델 이미지 표시

## 최신 반영 사항

- Electron 패키징 시 빈 화면 문제 수정 (`vite base` 상대경로 적용)
- 실행 파일 이름 통일: `HoopSole Compare Setup 0.1.0.exe`
- EXE 파일 Users 그룹 실행 권한(RX) 적용
- 레트로 기준: `releaseYear < 2000`, 현대 기준: `releaseYear >= 2000`

# Git Release Notes

## v0.1.0 (2026-03-30)

### 주요 수정
- Electron 패키징 환경에서 빈 화면이 뜨던 문제 수정 (`vite.config.ts`에 `base: "./"` 적용).
- Windows portable 실행 파일 재패키징 완료.
- 실행 파일 이름을 `HoopSole Compare Setup 0.1.0.exe`로 통일.
- 모든 사용자(Users 그룹) 실행 가능하도록 EXE 읽기/실행 권한(RX) 적용.

### 실행 파일 경로
- `release/HoopSole Compare Setup 0.1.0.exe`

### 비고
- 앱은 관리자 권한 없이 실행되도록(`asInvoker`) 설정되어 있음.

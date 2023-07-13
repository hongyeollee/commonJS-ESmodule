# TNHassignmentPractice

### 요구사항
- `swagger API 문서 참고`하여 API 서버구현
- JWT 토큰을 사용하여 `POST /login` API를 통해 인증처리, 인증된 클라이언트 만 API 사용할 수 있게 한다.(id, pw 자유)
- API 중 POST method의 경우 DB schema에 맞게 저장
- 주민번호는 암호화하여 저장하고 `GET`요청 시 복호화 하여 전달(암호화 방식 자유)
- 이미지생성
  - 별도 API는 정해지지 않으며 임의 API를 자유롭게 정하여 multipart/form-data를 사용하여 이미지를 로컬서버에 저장(DB TABLE: patient_image)
- 사용하는 모듈은 자유롭게 사용

### 필수사항
- `express 프레임워크` `mysql RDB`를 사용(JS, TS 선택 자유)

### 선택사항
- readme 파일에 프로젝트 실행 방법과 디렉토리 구조에 대해 상세하게 설명

### 추가사항
- testCode 작성
- 성능최적화
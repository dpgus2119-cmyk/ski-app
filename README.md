# 설원 스키 렌탈 데모

한국어 스키 장비 대여·반납 웹앱입니다. 빌드 과정 없이 GitHub Pages에서 제공할 수 있는 정적 사이트이며, 회원 계정과 회원별 대여·이용 기록은 Firebase Authentication과 Cloud Firestore를 사용합니다.

## GitHub Pages에 게시

1. ZIP 압축을 풀고 파일을 GitHub 저장소의 루트에 올립니다. `index.html`이 저장소 루트에 있어야 합니다.
2. GitHub 저장소에서 **Settings → Pages**로 이동합니다.
3. **Deploy from a branch**를 선택하고 게시할 브랜치와 `/ (root)` 폴더를 지정한 뒤 저장합니다.
4. 게시가 끝나면 `https://<GitHub 사용자명>.github.io/<저장소명>/`에서 앱을 엽니다.

## Firebase 설정

앱은 Firebase 웹 SDK를 Google CDN에서 가져오므로 인터넷 연결이 필요합니다. 앱은 `index.html`의 Firebase 설정으로 연결됩니다.

1. Firebase Console에서 **Authentication → 로그인 방법**의 **이메일/비밀번호** 제공자를 사용 설정합니다.
2. **Authentication → 설정 → 승인된 도메인**에 GitHub Pages 호스트를 추가합니다. 예: `<GitHub 사용자명>.github.io`.
3. Firebase Console에서 Cloud Firestore 데이터베이스를 만듭니다.
4. 이 패키지의 `firestore.rules` 내용을 **Firestore → 규칙**에 붙여 넣고 게시합니다.
5. GitHub Pages 주소에서 회원가입을 하면 `users/{UID}`에 회원 정보가 만들어집니다. 활성 대여는 `users/{UID}/rentalRecords`, 완료된 이용 내역은 `users/{UID}/usageRecords`에 기록됩니다.

Firestore 규칙은 로그인한 사용자가 자기 UID 경로에만 접근하도록 제한하고, 나머지 경로는 차단합니다. 규칙 파일은 GitHub Pages 배포와 별도로 Firebase에 게시해야 합니다.

## 로컬 미리보기

Node.js가 설치된 환경에서 이 폴더를 열고 다음을 실행한 뒤 `http://localhost:8000`으로 이동합니다.

```powershell
node serve.js
```

## 참고

- 사진 판독은 실제 AI가 아닌 무작위 데모 결과입니다.
- 결제는 화면 체험용이며 실제 승인이나 송금은 없습니다.
- Firebase 웹 설정은 브라우저에 공개되는 값입니다. 데이터 보호는 Firestore 보안 규칙이 담당합니다. 관리자 키나 서비스 계정 비밀키를 웹앱에 추가하지 마세요.
- 포인트 계산은 클라이언트에서 실행되는 데모 로직입니다. 실제 서비스의 포인트 무결성은 신뢰할 수 있는 서버에서 처리해야 합니다.

`해당 문서 및 API는 이정표가 작성했으며 궁금하신 부분있으면 언제든 연락주세요!`

[kakaoAuthenticate](#kakaoAuthenticate)

[getUser](#getUser)

## Passport.js 를 활용한 Oauth 인증

### 유저 세션 생성에 이용되는 API들입니다.

## Base URL

`http://3.37.194.249/auth`

## kakaoAuthenticate

### description

카카오 로그인 버튼을 누르면 실행되게하는 API입니다.
성공하게 되면, 세션이 유지되는 동안 보내는 요청에 req.user에 user의 정보가 자동으로 담겨서 백엔드로 전달됩니다.

> 이후 모든 요청을 보낼때 {withCredentials: true} 를 포함시켜야 합니다.

### Req

- method

  `GET`

- url

  `/kakao`

### Res

```json
{
  "success": true,
  "status": 201,
  "data": "카카오 세션 생성 완료."
}
```

## getUser

### description

oAuth 세션 생성이후 리다이렉트 된 페이지에서 보내야할 API입니다.
요청의 req.user에 세션이 담겨 백엔드로 전달되니 따로 보내야할 query는 없습니다.
response.data.data.user에 유저 정보가 담아 프런트로 갑니다.

> 요청을 보낼때 {withCredentials: true} 를 포함시켜야 합니다.

### Req

- method

  `GET`

- url

  `/getUser`

### Res

```json
{
  "success": true,
  "status": 201,
  "data": { "user": "req.user" }
}
```

- | Field              | Type    | Description                    |
  | ------------------ | ------- | ------------------------------ |
  | success            | boolean | 응답 성공 여부                 |
  | status             | number  | Status Code                    |
  | data               | List    | 유저 정보                      |
  | data.id            | int     | 유저 id (이걸로 식별안함)      |
  | data.uid           | int     | 소셜 id (이걸로 식별)          |
  | data.provider      | text    | 소셜 플랫폼( kakao or apple)   |
  | data.email         | string  | 유저 이메일 (아직 사용계획 무) |
  | data.nickname      | string  | 유저 닉네임                    |
  | data.teamId        | string  | 선호팀 id                      |
  | data.reportedCount | int     | 신고당한 횟수                  |
  | data.refreshedAt   | date    | 닉네임 변경한 시간             |
  | data.teamUpdatedAt | date    | 선호팀 변경한 시간             |

`해당 문서 및 API는 이정표가 작성했으며 궁금하신 부분있으면 언제든 연락주세요!`

[login](#login)
[signup](#signup)
[signout](#signout)
[read](#read)

## Base URL

`http://3.37.194.249/auth`

## login

### description

프런트에서 oAuth를 통해 소셜id (kakaoId, appleId)를 추출해서 백으로 보내주면 가입여부를 확인하고 토큰을 발급해주는 API입니다.

백에서는 소셜id를 user테이블의 uid와 비교해서 기존유저면 200을 , 신규유저면 401을, 소셜id값이 담겨있지 않을 경우 400을 리턴합니다.

프런트는 200을 받았을 경우
res.header의 accesstoken과 refreshtoken의 jwt를 로컬에 저장하여 사용하고, 메인페이지로 이동시키면 됩니다.

401을 받았을경우 회원가입페이지(팀선택페이지)로 이동시키면 됩니다.

400을 받았을경우 다시 로그인 버튼이 있는 페이지로 이동시키면 됩니다.

### Req

- method

  `POST`

- url

  `/login`

- request body

```
{
  "id" : {{Int}}
}
```

| Field | Type    | Description | Example  | Required |
| ----- | ------- | ----------- | -------- | :------: |
| id    | integer | 소셜 id     | 12345678 |    O     |

<br/>

### Res

<br/>

- success response

  - header

  | Method       | parameter | Description          | Required |
  | ------------ | --------- | -------------------- | :------: |
  | accesstoken  | {{token}} | accesstoken(1hr)     |    O     |
  | refreshtoken | {{token}} | refreshtoken(30days) |    O     |

  - data

```json
{
  "success": true,
  "status": 200,
  "data": "로그인 성공"
}
```

- fail response
  - data

```json
//신규유저일 경우
{
  "success": false,
  "status": 401,
  "msg": "회원가입이 필요한 유저입니다."
}
```

```json
//소셜 id값을 제대로 전달받지 못했을 경우
{
  "success": false,
  "status": 400,
  "msg": "missing id."
}
```

## signup

### description

회원가입 API입니다.
body에 소셜 id값, 닉네임, 팀id, provider( kakao or apple)를 넣어보내면 회원가입을 시켜줍니다.
팀id는 선택사항이니 필수는 아닙니다.

프런트는 200을 받았을 경우
res.header의 accesstoken과 refreshtoken의 jwt를 로컬에 저장하여 사용하고, 메인페이지로 이동시키면 됩니다.

필수요소들이 담겨있지 않으면 400 을 받습니다.

### Req

- method

  `POST`

- url

  `/signup`

- request body

```
{
  "id" : {{Int}},
  "nickname" : {{String}},
  "teamId" : {{Int}},
  "provider: {{String}}
}
```

<br/>

> 닉네임의 경우 유효성검사를 해서 보내주세요!

<br/>

| Field    | Type    | Description                      | Example     | Required |
| -------- | ------- | -------------------------------- | ----------- | :------: |
| id       | integer | 소셜 id                          | 12345678    |    O     |
| nickname | string  | 닉네임                           | 페이커짱123 |    O     |
| teamId   | integer | 선택한 팀id                      | 1           |          |
| provider | string  | 소셜 플랫폼명 (kakao 혹은 apple) | apple       |    O     |

<br/>

### Res

<br/>

- success response

  - header

  | Method       | parameter | Description          | Required |
  | ------------ | --------- | -------------------- | :------: |
  | accesstoken  | {{token}} | accesstoken(1hr)     |    O     |
  | refreshtoken | {{token}} | refreshtoken(30days) |    O     |

  - data

```json
{
  "success": true,
  "status": 200,
  "data": "회원가입 성공"
}
```

- fail response
  - data

```json
//소셜 id값을 제대로 전달받지 못했을 경우
{
  "success": false,
  "status": 400,
  "msg": "missing requirements"
}
```

<br/>
<br/>
<br/>

## signout

### description

회원탈퇴 API입니다.
유저 테이블의 해당 유저 정보를 제거합니다.

프런트는 200을 받았을 경우
로컬에 저장된 accesstoken과 refreshtoken의 jwt를 제거하고,
로그인페이지로 이동시키면 됩니다.

### Req

- method

  `DELETE`

- url

  `/signout`

- header

| Method       | parameter | Description          | Required |
| ------------ | --------- | -------------------- | :------: |
| accesstoken  | {{token}} | accesstoken(1hr)     |    O     |
| refreshtoken | {{token}} | refreshtoken(30days) |    O     |

<br/>

### Res

<br/>

- success response

  - data

```json
{
  "success": true,
  "status": 200,
  "data": "user deleted"
}
```

- fail response
  - data

```json
{
  "success": false,
  "status": 400,
  "msg": "failed to delete user"
}
```

<br/>
<br/>
<br/>

## read

### description

유저 정보를 읽는 api입니다.
header의 토큰을 통해 유저를 식별하여 해당 유저 정보를 보냅니다.
response.data.userData에 유저 정보가 담겨 프런트로 갑니다.

### Req

- method

  `GET`

- url

  `/read`

- header

  | Method       | parameter | Description          | Required |
  | ------------ | --------- | -------------------- | :------: |
  | accesstoken  | {{token}} | accesstoken(1hr)     |    O     |
  | refreshtoken | {{token}} | refreshtoken(30days) |    O     |

### Res

```json
{
  "success": true,
  "status": 201,
  "data": "userData"
}
```

| Field                  | Type    | Description                    |
| ---------------------- | ------- | ------------------------------ |
| success                | boolean | 응답 성공 여부                 |
| status                 | number  | Status Code                    |
| userData               | List    | 유저 정보                      |
| userData.id            | int     | 유저 id                        |
| userData.uid           | int     | 소셜 id                        |
| userData.provider      | text    | 소셜 플랫폼( kakao or apple)   |
| userData.email         | string  | 유저 이메일 (아직 사용계획 무) |
| userData.nickname      | string  | 유저 닉네임                    |
| userData.teamId        | int     | 선호팀 id                      |
| userData.reportedCount | int     | 신고당한 횟수                  |
| userData.refreshedAt   | date    | 닉네임 변경한 시간             |
| userData.teamUpdatedAt | date    | 선호팀 변경한 시간             |

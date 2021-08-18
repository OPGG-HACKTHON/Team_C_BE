`해당 문서 및 API는 이정표가 작성했으며 궁금하신 부분있으면 언제든 연락주세요!`

[createTinder](#createTinder)

## 틴더 CRUD에 이용되는 API입니다.

## Base URL

> http://3.37.194.249/tinder

## createTinder

### description

틴더 생성

### Req

- method

  `POST`

- url

  `/create`

- header

  | Method       | parameter | Description          | Required |
  | ------------ | --------- | -------------------- | :------: |
  | accesstoken  | {{token}} | accesstoken(1hr)     |    O     |
  | refreshtoken | {{token}} | refreshtoken(30days) |    O     |

- body
  | Field | Type | Description | Required |
  | -------- | ------ | ---------------------- |:------: |
  | msg | String | 틴더 메세지 | O |
  | gameId | Int | 해당 게임 id (게임중일때 넣어주세요)| |

### Res

- success

```json
{
  "success": true,
  "status": 200,
  "data": "틴더 생성 성공."
}
```

-fail

```json
{
  "success": false,
  "status": 400,
  "msg": "틴더 생성 실패."
}
```

user의 reportedCount가 5이상인 경우

```json
{
  "success": false,
  "status": 401,
  "msg": "틴더 생성이 금지된 유저입니다."
}
```

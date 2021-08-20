`해당 문서 및 API는 이정표가 작성했으며 궁금하신 부분있으면 언제든 연락주세요!`

[createTinder](#createTinder)

[getHistory](#getHistory)

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
  "data": "틴더 생성 성공"
}
```

-fail

```json
{
  "success": false,
  "status": 400,
  "msg": "틴더 생성 실패"
}
```

## getHistory

### description

틴더 히스토리 조회

### Req

- method

  `GET`

- url

  `/history`

- header

  | Method       | parameter | Description          | Required |
  | ------------ | --------- | -------------------- | :------: |
  | accesstoken  | {{token}} | accesstoken(1hr)     |    O     |
  | refreshtoken | {{token}} | refreshtoken(30days) |    O     |

### Res

- success

```
{
  "success": true,
  "status": 200,
  "data": [
        {
            "id": {int},
            "message": {{string}},
            "like": {{int}},
            "superlike": {{int}},
            "dislike": {{int}},
            "pass": {{int}},
            "createdAt": {{datetime}},
            "updatedAt": {{datetime}},
            "userId": {{int}},
            "gameId": {{int}},
            "teamId": {{int}}
        },   {
            "id": {{int}},
            "message": {{string}},
            "like": {{int}},
            "superlike": {{int}},
            "dislike": {{int}},
            "pass": {{int}},
            "createdAt": {{datetime}},
            "updatedAt": {{datetime}},
            "userId": {{int}},
            "gameId": {{int}},
            "teamId": {{int}}
        }]}
```

-fail

하루동안 작성된 틴더가 없을때

```json
{
  "success": false,
  "status": 401,
  "msg": "하루동안 히스토리가 없습니다."
}
```

그냥 실패했을 때

```json
{
  "success": false,
  "status": 400,
  "msg": "히스토리 조회 실패"
}
```

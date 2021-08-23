`아래 API는 이정표가 작성했으며 궁금하신 부분있으면 언제든 연락주세요!`

[createTinder](#createTinder)

[getHistory](#getHistory)

[createReport](#createReport)

[updateLike](#updateLike)

`아래 getTinder API는 장효택이 작성했으며 궁금하신 부분있으면 언제든 연락주세요!`

1. [ 21.8.23 | getTinder field 추가 ] : gameId 필드 추가.

[getTinder](#getTinder)

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

## getTinder

### description

최근 1분 내의 틴더 받기.

### Req

- method

  `GET`

- url

  `/`

- example url

  `/tinder?count=3&filter=1,3`

- header

  | Method       | parameter | Description          | Required |
  | ------------ | --------- | -------------------- | :------: |
  | accesstoken  | {{token}} | accesstoken(1hr)     |    O     |
  | refreshtoken | {{token}} | refreshtoken(30days) |    O     |

  - params

  | key    | type   | Description                                                           |
  | ------ | ------ | --------------------------------------------------------------------- |
  | count  | number | 받고싶은 틴더의 개수                                                  |
  | filter | string | 받고싶지 않은 팀들의 id 문자열 조합. ','로 연결된 String. ex) "1,2,5" |

### Res

- success

```json
{
	"success": true,
	"status": 200,
	"data": [
		{
			"id": 55,
			"gameId": null,
			"message": "베이스 url 테스트입니다22",
			"like": 0,
			"superlike": 0,
			"dislike": 0,
			"pass": 0,
			"createdAt": "2021-08-23T13:24:03.000Z",
			"user": {
				"id": 49,
				"nickname": "hahahsa"
			},
			"team": {
				"id": 1,
				"icon": "https://cdn.pandascore.co/images/team/image/128409/dwg_ki_alogo_square.png",
				"name": "DK"
			}
		},
		{
			"id": 54,
			"gameId": null,
			"message": "베이스 url 테스트입니다",
			"like": 0,
			"superlike": 0,
			"dislike": 0,
			"pass": 0,
			"createdAt": "2021-08-23T13:24:00.000Z",
			"user": {
				"id": 49,
				"nickname": "hahahsa"
			},
			"team": {
				"id": 1,
				"icon": "https://cdn.pandascore.co/images/team/image/128409/dwg_ki_alogo_square.png",
				"name": "DK"
			}
		}
	]
}
```

- | Field              | Type    | Description                              |
  | ------------------ | ------- | ---------------------------------------- |
  | success            | boolean | 응답 성공 여부                           |
  | status             | number  | Status Code                              |
  | data               | list    | 각 틴더                                  |
  | data.id            | number  | 틴더 id                                  |
  | data.gameId        | number  | 해당 경기 id, 경기 진행 중이 아니면 null |
  | data.message       | string  | 틴더 메시지                              |
  | data.like          | number  | 틴더 like 수                             |
  | data.superlike     | number  | 틴더 superlike 수                        |
  | data.dislike       | number  | 틴더 dislike 수                          |
  | data.pass          | number  | 틴더 pass 수                             |
  | data.createdAt     | data    | tinder 생성일                            |
  | data.user.id       | number  | 틴더 작성자의 id                         |
  | data.user.nickname | number  | 틴더 작성자의 닉네임                     |
  | data.team.id       | number  | 틴더 작성자의 팀 id                      |
  | data.team.icon     | number  | 틴더 작성자의 팀 icon                    |
  | data.team.name     | number  | 틴더 작성자의 팀 name                    |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "internal Error"
  }
  ```

## createReport

### description

틴더 리폿 생성

### Req

- method

  `POST`

- url

  `/report`

- header

  | Method       | parameter | Description          | Required |
  | ------------ | --------- | -------------------- | :------: |
  | accesstoken  | {{token}} | accesstoken(1hr)     |    O     |
  | refreshtoken | {{token}} | refreshtoken(30days) |    O     |

- body
  | Field | Type | Description | Required |
  | -------- | ------ | ---------------------- |:------: |
  | tinderId | Int | 리폿 대상 틴더의 id | O |
  | reportMsg | text | 리폿 내용 | O |

### Res

- success

```json
{
	"success": true,
	"status": 200,
	"data": "리폿 성공"
}
```

> 리폿 성공시에 리폿된 틴더에 대한 처리나 유저에 대한 제재에 대한 로직은 아직 구현되지 않았습니다.

-fail

```json
{
	"success": false,
	"status": 400,
	"msg": "리폿 실패"
}
```

틴더id나 리폿메시지가 body에 담겨있지 않을경우

```json
{
	"success": false,
	"status": 400,
	"msg": "틴더id나 리폿메시지가 부족합니다."
}
```

## updateLike

### description

틴더 리액션 추가(업데이트)

### Req

- method

  `PUT`

- url

  `/react`

- header

  | Method       | parameter | Description          | Required |
  | ------------ | --------- | -------------------- | :------: |
  | accesstoken  | {{token}} | accesstoken(1hr)     |    O     |
  | refreshtoken | {{token}} | refreshtoken(30days) |    O     |

- body
  | Field | Type | Description | Required |
  | -------- | ------ | ---------------------- |:------: |
  | tinderId | Int | 리액션 대상 틴더의 id | O |
  | like | Int | like 선택 시 1, 아니면 0 | O |
  | dislike | Int | dislike 선택 시 1, 아니면 0 | O |
  | superlike | Int | superlike 선택 시 1, 아니면 0 | O |
  | pass | Int | pass 선택 시 1, 아니면 0 | O |

### Res

- success

```json
{
	"success": true,
	"status": 200,
	"data": "리액션 성공"
}
```

-fail

```json
{
	"success": false,
	"status": 400,
	"msg": "리액션 실패"
}
```

틴더id나 리폿메시지가 body에 담겨있지 않을경우

```json
{
	"success": false,
	"status": 400,
	"msg": "틴더id나 리액션정보가 부족합니다."
}
```

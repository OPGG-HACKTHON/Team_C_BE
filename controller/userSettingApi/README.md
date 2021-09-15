`해당 문서 및 API는 이정표가 작성했으며 궁금하신 부분있으면 언제든 연락주세요!`

[updateNickname](#updateNickname)

[updateTeamId](#updateTeamId)

`하단 API는 장효택이 작성했으며 궁금하신 부분있으면 언제든 연락주세요!`

[savePreference](#savePreference)

[getUserPreference](#getUserPreference)

[getProfile](#getProfile)

## 유저정보 수정에 이용되는 API입니다.

### nickname 변경시 user table의 refreshedAt 에 Date.now() 찍힘.

### teamId 변경시 user table의 teamUpdatedAt 에 Date.now() 찍힘.

-08/07 팀변경 주기 추가

## Base URL

> http://3.37.194.249/userSetting

## updateNickname

### description

신규 유저 닉네임 생성 및 닉네임 변경.

### Req

- method

  `PUT`

- url

  `/nickname`

- header

  | Method       | parameter | Description          | Required |
  | ------------ | --------- | -------------------- | :------: |
  | accesstoken  | {{token}} | accesstoken(1hr)     |    O     |
  | refreshtoken | {{token}} | refreshtoken(30days) |    O     |

- body
  | Field | Type | Description | Required |
  | -------- | ------ | ---------------------- |:------: |
  | nickname | String | 변경하고자 하는 닉네임 | O |

### Res

- success

```json
{
	"success": true,
	"status": 201,
	"data": "닉네임 업데이트 성공."
}
```

## updateTeamId

### description

산호 팀 변경

팀 변경 주기 : 1달

### Req

- `PUT`

### url

`/teamId`

- header

  | Method       | parameter | Description          | Required |
  | ------------ | --------- | -------------------- | :------: |
  | accesstoken  | {{token}} | accesstoken(1hr)     |    O     |
  | refreshtoken | {{token}} | refreshtoken(30days) |    O     |

- body

  | Field  | Type    | Description          | Required |
  | ------ | ------- | -------------------- | :------: |
  | teamId | Integer | 변경하고자 하는 팀id |    O     |

- success

```json
{
	"success": true,
	"status": 201,
	"data": "선호팀 업데이트 성공."
}
```

- fail

`팀 변경한지 한달이 지나지 않았을 경우`

```json
{
	"success": false,
	"status": 400,
	"msg": "M월 N일"
}
```

- M월 N일 = 유저의 직전 팀변경일 + 1달 후
- ex) " ${response.data.msg}이후에 팀변경이 가능합니다. "

## savePreference

### description

유저의 선호선수를 등록하는 API

### Req

- header

  - | Field        | Type   | Description  |
    | ------------ | ------ | ------------ |
    | accesstoken  | string | accesstoken  |
    | refreshtoken | string | refreshtoken |

- method

  - `POST`

- url

  - `/preference`

- body

```json
{
	"players": ["7", "1", "27", "37"]
}
```

- | Field   | Type | Description         |
  | ------- | ---- | ------------------- |
  | players | list | 선호 선수 id 리스트 |

### Res

- success

  ```json
  {
  	"success": true,
  	"status": 201,
  	"data": "선호 선수 등록을 완료했습니다."
  }
  ```

  - | Field   | Type    | Description    |
    | ------- | ------- | -------------- |
    | success | boolean | 응답 성공 여부 |
    | status  | number  | Status Code    |
    | data    | string  | msg            |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "internal Error"
  }
  ```

## getUserPreference

### description

유저의 선호선수를 확인하는 API

### Req

- header

  - | Field        | Type   | Description  |
    | ------------ | ------ | ------------ |
    | accesstoken  | string | accesstoken  |
    | refreshtoken | string | refreshtoken |

- method

  - `GET`

- url

  - `/preference`

### Res

- success

  ```json
  {
  	"success": true,
  	"status": 200,
  	"data": [
  		{
  			"id": 7,
  			"nickname": "RangJun",
  			"role": "mid",
  			"image": "https://cdn.pandascore.co/images/player/image/33027/dk_rang_jun_2021_split_1.png",
  			"point": 0,
  			"key": 100003273
  		},
  		{
  			"id": 1,
  			"nickname": "Ghost",
  			"role": "adc",
  			"image": "https://cdn.pandascore.co/images/player/image/696/dk_ghost_2021_split_1.png",
  			"point": 0,
  			"key": 100000588
  		},
  		{
  			"id": 27,
  			"nickname": "Jun",
  			"role": "sup",
  			"image": "https://cdn.pandascore.co/images/player/image/31911/drx.c_jun_2021_split_1.png",
  			"point": 0,
  			"key": 100003509
  		},
  		{
  			"id": 37,
  			"nickname": "Oner",
  			"role": "jun",
  			"image": "https://cdn.pandascore.co/images/player/image/31392/t1_oner_2021_split_1.png",
  			"point": 0,
  			"key": 100003117
  		}
  	]
  }
  ```

  - | Field            | Type    | Description              |
    | ---------------- | ------- | ------------------------ |
    | success          | boolean | 응답 성공 여부           |
    | status           | number  | Status Code              |
    | data             | list    | 선수 list                |
    | data[0].id       | number  | player db pk             |
    | data[0].nickname | string  | 선수 이름                |
    | data[0].role     | string  | 선수 포지션              |
    | data[0].image    | string  | 선수 프로필 이미지 URL   |
    | data[0].point    | number  | 선수 pog 점수            |
    | data[0].key      | number  | API 검색을 위한 선수 key |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "internal Error"
  }
  ```

## getProfile

### description

마이페이지에서 유저 정보를 확인하는 API

### Req

- header

  - | Field        | Type   | Description  |
    | ------------ | ------ | ------------ |
    | accesstoken  | string | accesstoken  |
    | refreshtoken | string | refreshtoken |

- method

  - `GET`

- url

  - `/profile`

### Res

- success

  ```json
  {
  	"success": true,
  	"status": 200,
  	"data": {
  		"teamIcon": "https://cdn.pandascore.co/images/team/image/128409/dwg_ki_alogo_square.png",
  		"teamName": "DK",
  		"nickname": "페이커짱123"
  	}
  }
  ```

  - | Field         | Type    | Description    |
    | ------------- | ------- | -------------- |
    | success       | boolean | 응답 성공 여부 |
    | status        | number  | Status Code    |
    | data          | list    | 선수 list      |
    | data.teamIcon | string  | 팀 아이콘      |
    | data.teamName | string  | 팀 이름        |
    | data.nickname | string  | 유저 닉네임    |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "internal Error"
  }
  ```

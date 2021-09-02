`해당 문서 및 API는 장효택이 작성했으며 궁금하신 부분있으면 언제든 연락주세요!`

1. [ 21.8.14 | votePOG body, header 수정 ] : 기존 헤더의 토큰 부재로, body에 user uid를 따로 입력 받아 사용했던 로직을, 토큰 사용을 통해 불필요해서 제거 했습니다.
2. [ 21.8.18 | getPOGResult ] : cnt라는 용어를 count로 통일했습니다.
3. [ 21.8.20 | http status code update ] : get 방식의 api 성공 리스폰스 status를 200으로 변경.
4. [ 21.9.02 | getPOGResult ] : query를 통한 gameId 검색 추가(gameId 비우면 현재 게임으로 검색 가능).

---

[getPOGList](#getPOGList)

[getPOGResult](#getPOGResult)

[votePOG](#votePOG)

## POG 투표와 조회를 위한 API Router입니다.

## Base URL

`http://3.37.194.249/pog`

## getPOGList

### description

현재 경기에 대한 POG 투표 가능 선수의 목록을 확인하는 API

### Req

- method

  - `GET`

- url

  - `/list`

### Res

- success

  `data의 리스트는 축약했습니다.`

  ```json
  {
  	"success": true,
  	"status": 200,
  	"data": {
  		"aTeam": {
  			"name": "AF",
  			"icon": "https://cdn.pandascore.co/images/team/image/120/afreeca_freecslogo_profile.png",
  			"id": 9,
  			"player": [
  				{
  					"nickname": "Kiin",
  					"role": "top",
  					"image": "https://cdn.pandascore.co/images/player/image/3524/220px_af_kiin_2020_split_1.png",
  					"gamePlayerId": 92
  				},
  				{
  					"nickname": "Leo",
  					"role": "adc",
  					"image": "https://cdn.pandascore.co/images/player/image/14239/lsb_leo_2021_split_1.png",
  					"gamePlayerId": 94
  				}
  			]
  		},
  		"bTeam": {
  			"name": "HLE",
  			"icon": "https://cdn.pandascore.co/images/team/image/2883/hanwha-life-esports-1s04vbu0.png",
  			"id": 7,
  			"player": [
  				{
  					"nickname": "Morgan",
  					"role": "top",
  					"image": "https://cdn.pandascore.co/images/player/image/21861/hle_morgan_2021_split_1.png",
  					"gamePlayerId": 91
  				}
  			]
  		}
  	}
  }
  ```

  aTeam과 bTeam은 중복된 내용이기에 생략했습니다.

  - | Field                          | Type    | Description                  |
    | ------------------------------ | ------- | ---------------------------- |
    | success                        | boolean | 응답 성공 여부               |
    | status                         | number  | Status Code                  |
    | data                           | object  | 각 팀                        |
    | data.aTeam.name                | string  | aTeam의 이름                 |
    | data.aTeam.icon                | string  | aTeam의 icon url             |
    | data.aTeam.id                  | number  | aTeam의 table pk             |
    | data.aTeam.player              | List    | aTeam 선수 출전 선수 목록    |
    | data.aTeam.player.nickname     | string  | 선수 이름                    |
    | data.aTeam.player.role         | string  | 선수 라인                    |
    | data.aTeam.player.image        | string  | 선수 image url               |
    | data.aTeam.player.gamePlayerId | number  | 투표할 때 필요한 선수 key 값 |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "internal Error"
  }
  ```

## getPOGResult

### description

현재 경기에 대한 POG 투표 현황을 확인하는 API

### Req

- method

  - `GET`

- url

  - `/result?gameId={gameId}`
  - 만약 gameId를 비운다면 현재 OnAir 경기의 POG Result가 나옵니다!

- params

  | key    | type | Description |
  | ------ | ---- | ----------- |
  | gameId | int  | 해당 게임id |

### Res

- success

  `data의 리스트는 축약했습니다.`

  ```json
  {
  	"success": true,
  	"status": 200,
  	"data": {
  		"aTeam": {
  			"name": "AF",
  			"icon": "https://cdn.pandascore.co/images/team/image/120/afreeca_freecslogo_profile.png",
  			"id": 9,
  			"player": [
  				{
  					"nickname": "Kiin",
  					"role": "top",
  					"image": "https://cdn.pandascore.co/images/player/image/3524/220px_af_kiin_2020_split_1.png",
  					"gamePlayerId": 92,
  					"count": 363,
  					"rate": 1
  				},
  				{
  					"nickname": "Leo",
  					"role": "adc",
  					"image": "https://cdn.pandascore.co/images/player/image/14239/lsb_leo_2021_split_1.png",
  					"gamePlayerId": 94,
  					"count": 1235,
  					"rate": 3.42
  				}
  			]
  		},
  		"bTeam": {
  			"name": "HLE",
  			"icon": "https://cdn.pandascore.co/images/team/image/2883/hanwha-life-esports-1s04vbu0.png",
  			"id": 7,
  			"player": [
  				{
  					"nickname": "Morgan",
  					"role": "top",
  					"image": "https://cdn.pandascore.co/images/player/image/21861/hle_morgan_2021_split_1.png",
  					"gamePlayerId": 91,
  					"count": 6456,
  					"rate": 17.92
  				},
  				{
  					"nickname": "Chovy",
  					"role": "mid",
  					"image": "https://cdn.pandascore.co/images/player/image/15000/hle_chovy_2021_split_1.png",
  					"gamePlayerId": 93,
  					"count": 8965,
  					"rate": 24.88
  				}
  			]
  		}
  	}
  }
  ```

  aTeam과 bTeam은 중복된 내용이기에 생략했습니다.

  - | Field                          | Type    | Description                               |
    | ------------------------------ | ------- | ----------------------------------------- |
    | success                        | boolean | 응답 성공 여부                            |
    | status                         | number  | Status Code                               |
    | data                           | object  | 각 팀                                     |
    | data.aTeam.name                | string  | aTeam의 이름                              |
    | data.aTeam.icon                | string  | aTeam의 icon url                          |
    | data.aTeam.id                  | number  | aTeam의 table pk                          |
    | data.aTeam.player              | List    | aTeam 선수 출전 선수 목록                 |
    | data.aTeam.player.nickname     | string  | 선수 이름                                 |
    | data.aTeam.player.role         | string  | 선수 라인                                 |
    | data.aTeam.player.image        | string  | 선수 image url                            |
    | data.aTeam.player.gamePlayerId | number  | 투표할 때 필요한 선수 key 값              |
    | data.aTeam.player.count        | number  | 선수 투표수                               |
    | data.aTeam.player.rate         | number  | 전체 선수가 100일 때, 선수의 count 백분율 |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "internal Error"
  }
  ```

## votePOG

### description

POG 투표 API

### Req

- method

  - `POST`

- header

  - | Field        | Type   | Description  |
    | ------------ | ------ | ------------ |
    | accesstoken  | string | accesstoken  |
    | refreshtoken | string | refreshtoken |

- url

  - `/vote`

- body

```json
{
	"vote": [
		{ "gamePlayerId": 92, "count": 11 },
		{ "gamePlayerId": 94, "count": 14 },
		{ "gamePlayerId": 96, "count": 11 }
	]
}
```

- | Field                | Type   | Description                 |
  | -------------------- | ------ | --------------------------- |
  | vote                 | list   | 각 선수 투표에 대한 리스트  |
  | vote[0].gamePlayerId | number | player에 투표에 해당하는 id |
  | vote[0].count        | number | 사용자가 터치한 투표 수     |

### Res

- success

  `data의 리스트는 축약했습니다.`

  ```json
  {
  	"success": true,
  	"status": 201,
  	"data": "투표를 완료했습니다."
  }
  ```

  aTeam과 bTeam은 중복된 내용이기에 생략했습니다.

  - | Field   | Type    | Description    |
    | ------- | ------- | -------------- |
    | success | boolean | 응답 성공 여부 |
    | status  | number  | Status Code    |
    | data    | string  | 성공 메시지    |

- fail

  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "Internel Error"
  }
  ```

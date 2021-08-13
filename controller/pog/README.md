`해당 문서 및 API는 장효택이 작성했으며 궁금하신 부분있으면 언제든 연락주세요!`

---

[getPOGList](#getPOGList)

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
  	"status": 201,
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
  					"key": 100000581
  				},
  				{
  					"nickname": "Leo",
  					"role": "adc",
  					"image": "https://cdn.pandascore.co/images/player/image/14239/lsb_leo_2021_split_1.png",
  					"key": 100000622
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
  					"key": 100002033
  				},
  				{
  					"nickname": "Chovy",
  					"role": "mid",
  					"image": "https://cdn.pandascore.co/images/player/image/15000/hle_chovy_2021_split_1.png",
  					"key": 100000941
  				}
  			]
  		}
  	}
  }
  ```

  aTeam과 bTeam은 중복된 내용이기에 생략했습니다.

  - | Field                      | Type    | Description                  |
    | -------------------------- | ------- | ---------------------------- |
    | success                    | boolean | 응답 성공 여부               |
    | status                     | number  | Status Code                  |
    | data                       | object  | 각 팀                        |
    | data.aTeam.name            | string  | aTeam의 이름                 |
    | data.aTeam.icon            | string  | aTeam의 icon url             |
    | data.aTeam.id              | number  | aTeam의 table pk             |
    | data.aTeam.player          | List    | aTeam 선수 출전 선수 목록    |
    | data.aTeam.player.nickname | string  | 선수 이름                    |
    | data.aTeam.player.role     | string  | 선수 라인                    |
    | data.aTeam.player.image    | string  | 선수 image url               |
    | data.aTeam.player.key      | string  | 투표할 때 필요한 선수 key 값 |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "Internel Error"
  }
  ```

## getPOGResult

### description

현재 경기에 대한 POG 투표 현황을 확인하는 API

### Req

- method

  - `GET`

- url

  - `/result`

### Res

- success

  `data의 리스트는 축약했습니다.`

  ```json
  {
  	"success": true,
  	"status": 201,
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
  					"key": 100000581,
  					"cnt": 363,
  					"rate": 1
  				},
  				{
  					"nickname": "Leo",
  					"role": "adc",
  					"image": "https://cdn.pandascore.co/images/player/image/14239/lsb_leo_2021_split_1.png",
  					"key": 100000622,
  					"cnt": 1235,
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
  					"key": 100002033,
  					"cnt": 6456,
  					"rate": 17.92
  				},
  				{
  					"nickname": "Chovy",
  					"role": "mid",
  					"image": "https://cdn.pandascore.co/images/player/image/15000/hle_chovy_2021_split_1.png",
  					"key": 100000941,
  					"cnt": 8965,
  					"rate": 24.88
  				}
  			]
  		}
  	}
  }
  ```

  aTeam과 bTeam은 중복된 내용이기에 생략했습니다.

  - | Field                      | Type    | Description                             |
    | -------------------------- | ------- | --------------------------------------- |
    | success                    | boolean | 응답 성공 여부                          |
    | status                     | number  | Status Code                             |
    | data                       | object  | 각 팀                                   |
    | data.aTeam.name            | string  | aTeam의 이름                            |
    | data.aTeam.icon            | string  | aTeam의 icon url                        |
    | data.aTeam.id              | number  | aTeam의 table pk                        |
    | data.aTeam.player          | List    | aTeam 선수 출전 선수 목록               |
    | data.aTeam.player.nickname | string  | 선수 이름                               |
    | data.aTeam.player.role     | string  | 선수 라인                               |
    | data.aTeam.player.image    | string  | 선수 image url                          |
    | data.aTeam.player.key      | string  | 투표할 때 필요한 선수 key 값            |
    | data.aTeam.player.cnt      | number  | 선수 투표수                             |
    | data.aTeam.player.rate     | number  | 전체 선수가 100일 때, 선수의 cnt 백분율 |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "Internel Error"
  }
  ```

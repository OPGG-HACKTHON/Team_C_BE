`해당 문서 및 API는 장효택이 작성했으며 궁금하신 부분있으면 언제든 연락주세요!`

### 수정 Log

1. [ 21.8.9 | getMonthSchedule field name 수정 ] : 기존 스네이크와 카멜 표기법이 섞인 필드를 제공하였는데, 모두 카멜 표기법으로 통일했습니다.
2. [ 21.8.14 | getPOGRank ] : getPOGRank에서 rank 필드가 추가됐습니다.
3. [ 21.8.18 | getPOGRank, getCurrentGame ] : Team info를 나타내는 부분을 TeamInfod와 동일하게 ID 필드를 추가했습니다.
4. [ 21.8.20 | getCurrentGame 로직 수정 ] : 기존 -1 (경기 전), 0 (경기 중), 1 (경기 후) 3가지의 status를 제공했는데, 경기 후 30분 전과 후를 명확히 구분짓는 로직이 필요해서, 경기 업데이트 api의 status를 -1 (경기 전), 0 (경기 중), 1 (경기 후 30분 이전), 2 (경기 후 30분 이후) 4가지로 변경했습니다. 이에 따라 current 게임의 status 또한 4가지가 됐습니다.
5. [ 21.8.20 | status code 변경 ] : 기존 get 방식의 성공 리스폰스의 status가 201에서 200으로 변경.

---

[getMonthSchedule](#getMonthSchedule)

[getTeamRank](#getTeamRank)

[getPOGRank](#getPOGRank)

[getTeamInfo](#getTeamInfo)

[getCurrentGame](#getCurrentGame)

[getGameResultById](#getGameResultById)

## 경기 일정, 순위, POG 순위 등 다양한 정보를 다루는 API Router입니다.

## Base URL

`http://3.37.194.249/info`

## getMonthSchedule

### description

원하는 달의 경기 일정 및 결과 등의 정보를 확인하는 API

### Req

- method

  - `GET`

- url

  - `/schedule?month=8`

- params
  - | Field | Type    | Description      |
    | ----- | ------- | ---------------- |
    | month | Integer | 조회를 원하는 월 |

### Res

- success

  `data의 리스트는 축약했습니다.`

  ```json
  {
  	"success": true,
  	"status": 200,
  	"data": [
  		{
  			"id": 73,
  			"aTeamName": "NS",
  			"bTeamName": "HLE",
  			"aTeamIcon": "https://cdn.pandascore.co/images/team/image/128217/nongshim_red_forcelogo_square.png",
  			"bTeamIcon": "https://cdn.pandascore.co/images/team/image/2883/hanwha-life-esports-1s04vbu0.png",
  			"aTeamScore": 2,
  			"bTeamScore": 1,
  			"status": 1,
  			"startTime": "2021-08-01T17:00:00.000Z"
  		},
  		{
  			"id": 74,
  			"aTeamName": "DK",
  			"bTeamName": "KT",
  			"aTeamIcon": "https://cdn.pandascore.co/images/team/image/128409/dwg_ki_alogo_square.png",
  			"bTeamIcon": "https://cdn.pandascore.co/images/team/image/63/kt_rolsterlogo_profile.png",
  			"aTeamScore": 2,
  			"bTeamScore": 0,
  			"status": 1,
  			"startTime": "2021-08-01T20:00:00.000Z"
  		}
  	]
  }
  ```

  - | Field           | Type    | Description                                                                                             |
    | --------------- | ------- | ------------------------------------------------------------------------------------------------------- |
    | success         | boolean | 응답 성공 여부                                                                                          |
    | status          | number  | Status Code                                                                                             |
    | data            | List    | 해당 월에 존재하는 경기 정보들                                                                          |
    | data.id         | number  | game table pk                                                                                           |
    | data.aTeamName  | string  | A팀 이름                                                                                                |
    | data.bTeamName  | string  | B팀 이름                                                                                                |
    | data.aTeamIcon  | string  | A팀 아이콘 URL                                                                                          |
    | data.bTeamIcon  | string  | B팀 아이콘 URL                                                                                          |
    | data.aTeamScore | number  | A팀 스코어                                                                                              |
    | data.bTeamScore | number  | B팀 스코어                                                                                              |
    | data.status     | number  | 해당 경기의 상태 ex) -1 : 경기 전, 0 : 경기 중, 1 : 경기 종료 후 30분 이전 , 2 : 경기 종료 후 30분 이후 |
    | data.startTime  | Date    | 경기 시작 시간                                                                                          |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "internal Error"
  }
  ```

## getTeamRank

### description

팀 순위, 승, 패, 승률을 확인하는 API

### Req

- method

  - `GET`

- url

  - `/teamRank`

### Res

- success

  `data의 리스트는 축약했습니다.`

  ```json
  {
  	"success": true,
  	"status": 200,
  	"data": [
  		{
  			"id": 3,
  			"rank": 1,
  			"name": "NS",
  			"icon": "https://cdn.pandascore.co/images/team/image/128217/nongshim_red_forcelogo_square.png",
  			"win": 11,
  			"lose": 4,
  			"rate": 73
  		},
  		{
  			"id": 8,
  			"rank": 2,
  			"name": "GEN",
  			"icon": "https://cdn.pandascore.co/images/team/image/2882/geng-hooir6i9.png",
  			"win": 10,
  			"lose": 4,
  			"rate": 71
  		}
  	]
  }
  ```

  - | Field     | Type    | Description    |
    | --------- | ------- | -------------- |
    | success   | boolean | 응답 성공 여부 |
    | status    | number  | Status Code    |
    | data      | List    | LCK 팀들       |
    | data.id   | number  | team table pk  |
    | data.rank | number  | 팀 순위        |
    | data.name | string  | 팀 이름        |
    | data.icon | string  | 팀 아이콘 URL  |
    | data.win  | number  | 팀 승리 수     |
    | data.lose | number  | 팀 패배 수     |
    | data.rate | number  | 팀 승률        |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "internal Error"
  }
  ```

## getPOGRank

### description

POG 순위를 확인하는 API

### Req

- method

  - `GET`

- url

  - `/pogRank`

### Res

- success

  `data의 리스트는 축약했습니다.`
  `값은 임의로 넣었으며, 정렬은 pog point, 이후 nickname 오름차순입니다.`

  ```json
  {
  	"success": true,
  	"status": 200,
  	"data": [
  		{
  			"nickname": "BeryL",
  			"role": "sup",
  			"point": 200,
  			"team": {
  				"icon": "https://cdn.pandascore.co/images/team/image/128409/dwg_ki_alogo_square.png",
  				"name": "DK",
  				"id": 1
  			},
  			"rank": 1
  		},
  		{
  			"nickname": "Lava",
  			"role": "mid",
  			"point": 150,
  			"team": {
  				"icon": "https://cdn.pandascore.co/images/team/image/128218/fredit_brio_nlogo_square.png",
  				"name": "BRO",
  				"id": 2
  			},
  			"rank": 2
  		},
  		{
  			"nickname": "Khan",
  			"role": "top",
  			"point": 100,
  			"team": {
  				"icon": "https://cdn.pandascore.co/images/team/image/128409/dwg_ki_alogo_square.png",
  				"name": "DK",
  				"id": 1
  			},
  			"rank": 3
  		},
  		{
  			"nickname": "Rahel",
  			"role": "adc",
  			"point": 100,
  			"team": {
  				"icon": "https://cdn.pandascore.co/images/team/image/128409/dwg_ki_alogo_square.png",
  				"name": "DK",
  				"id": 1
  			},
  			"rank": 4
  		},
  		{
  			"nickname": "5Kid",
  			"role": "adc",
  			"point": 0,
  			"team": {
  				"icon": "https://opgg-hackathon.s3.ap-northeast-2.amazonaws.com/kt-01.png",
  				"name": "KT",
  				"id": 10
  			},
  			"rank": 5
  		}
  	]
  }
  ```

  - | Field          | Type    | Description        |
    | -------------- | ------- | ------------------ |
    | success        | boolean | 응답 성공 여부     |
    | status         | number  | Status Code        |
    | data           | List    | LCK 선수 리스트    |
    | data.nickname  | string  | 선수 이름          |
    | data.role      | string  | 선수 포지션        |
    | data.point     | number  | 선수의 POG 포인트  |
    | data.rank      | number  | 선수의 랭킹        |
    | data.team      | object  | 선수의 소속 팀 Obj |
    | data.team.icon | string  | 팀 icon img url    |
    | data.team.name | string  | 팀 이름            |
    | data.team.id   | number  | team table pk      |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "internal Error"
  }
  ```

## getTeamInfo

### description

전체 팀 이름, 아이콘, id를 확인하는 API

### Req

- method

  - `GET`

- url

  - `/teamInfo`

### Res

- success

  `data의 리스트는 축약했습니다.`
  `팀의 정렬은 name 오름차순입니다.`

  ```json
  {
  	"success": true,
  	"status": 200,
  	"data": [
  		{
  			"id": 9,
  			"name": "AF",
  			"icon": "https://cdn.pandascore.co/images/team/image/120/afreeca_freecslogo_profile.png"
  		},
  		{
  			"id": 2,
  			"name": "BRO",
  			"icon": "https://cdn.pandascore.co/images/team/image/128218/fredit_brio_nlogo_square.png"
  		},
  		{
  			"id": 1,
  			"name": "DK",
  			"icon": "https://cdn.pandascore.co/images/team/image/128409/dwg_ki_alogo_square.png"
  		},
  		{
  			"id": 5,
  			"name": "DRX",
  			"icon": "https://cdn.pandascore.co/images/team/image/126370/220px_dr_xlogo_square.png"
  		}
  	]
  }
  ```

  - | Field     | Type    | Description    |
    | --------- | ------- | -------------- |
    | success   | boolean | 응답 성공 여부 |
    | status    | number  | Status Code    |
    | data      | List    | LCK 팀들       |
    | data.id   | number  | team db pk     |
    | data.name | string  | 팀 이름        |
    | data.icon | string  | 팀 아이콘 URL  |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "internal Error"
  }
  ```

## getCurrentGame

### description

종료되고 30분이 지나지 않은 경기나, 현재 진행 중이거나, 예정인 가장 가까운 경기에 대한 정보를 제공합니다.

### Req

- method

  - `GET`

- url

  - `/currentGame`

### Res

- success - 경기가 존재할 때

  ```json
  {
  	"success": true,
  	"status": 200,
  	"data": {
  		"id": 85,
  		"aTeamScore": 0,
  		"bTeamScore": 0,
  		"startTime": "2021-08-13T08:00:00.000Z",
  		"status": -1,
  		"aTeam": {
  			"name": "GEN",
  			"icon": "https://cdn.pandascore.co/images/team/image/2882/geng-hooir6i9.png",
  			"id": 8
  		},
  		"bTeam": {
  			"name": "BRO",
  			"icon": "https://cdn.pandascore.co/images/team/image/128218/fredit_brio_nlogo_square.png",
  			"id": 2
  		}
  	}
  }
  ```

- success - 예정된 경기가 없을 때

  ```json
  {
  	"success": true,
  	"status": 200,
  	"data": null
  }
  ```

  - | Field           | Type    | Description                                                                                             |
    | --------------- | ------- | ------------------------------------------------------------------------------------------------------- |
    | success         | boolean | 응답 성공 여부                                                                                          |
    | status          | number  | Status Code                                                                                             |
    | data.id         | number  | game table pk                                                                                           |
    | data.aTeamScore | number  | A팀 스코어                                                                                              |
    | data.bTeamScore | number  | B팀 스코어                                                                                              |
    | data.startTime  | date    | 경기 시작 시간                                                                                          |
    | data.status     | number  | 해당 경기의 상태 ex) -1 : 경기 전, 0 : 경기 중, 1 : 경기 종료 후 30분 이전 , 2 : 경기 종료 후 30분 이후 |
    | data.aTeam.name | string  | A팀 이름                                                                                                |
    | data.aTeam.icon | string  | A팀 icon url                                                                                            |
    | data.aTeam.id   | number  | team table pk                                                                                           |
    | data.bTeam.name | string  | B팀 이름                                                                                                |
    | data.bTeam.icon | string  | B팀 icon url                                                                                            |
    | data.bTeam.id   | number  | team table pk                                                                                           |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "internal Error"
  }
  ```

## getGameResultById

### description

GameId를 통해 해당 경기에 대한 정보를 받는 API

### Req

- method

  - `GET`

- url

  - `/gameResult?gameId=360`

- params
  - | Field  | Type    | Description          |
    | ------ | ------- | -------------------- |
    | gameId | Integer | 조회를 원하는 gameId |

### Res

- success

  ```json
  {
  	"success": true,
  	"status": 200,
  	"data": {
  		"id": 360,
  		"aTeamName": "NS",
  		"bTeamName": "GEN",
  		"aTeamIcon": "https://cdn.pandascore.co/images/team/image/128217/nongshim_red_forcelogo_square.png",
  		"bTeamIcon": "https://cdn.pandascore.co/images/team/image/2882/geng-hooir6i9.png",
  		"aTeamScore": 0,
  		"bTeamScore": 2,
  		"status": 1,
  		"startTime": "2021-08-15T20:00:00.000Z"
  	}
  }
  ```

  - | Field           | Type    | Description                                                             |
    | --------------- | ------- | ----------------------------------------------------------------------- |
    | success         | boolean | 응답 성공 여부                                                          |
    | status          | number  | Status Code                                                             |
    | data            | object  | 해당 경기                                                               |
    | data.id         | number  | team db pk                                                              |
    | data.aTeamName  | string  | 팀 이름                                                                 |
    | data.bTeamName  | string  | 팀 이름                                                                 |
    | data.aTeamIcon  | string  | 팀 아이콘 URL                                                           |
    | data.bTeamIcon  | string  | 팀 아이콘 URL                                                           |
    | data.aTeamScore | number  | 팀 스코어                                                               |
    | data.bTeamScore | number  | 팀 스코어                                                               |
    | data.status     | number  | 경기 상태 (-1:경기전, 0:경기중, 1:경기후 30분 이전, 2:경기후 30분 이후) |
    | data.startTime  | date    | 경기 시작시간                                                           |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "internal Error"
  }
  ```

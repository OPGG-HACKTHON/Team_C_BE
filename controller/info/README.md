`해당 문서 및 API는 장효택이 작성했으며 궁금하신 부분있으면 언제든 연락주세요!`

[getMonthSchedule](#getMonthSchedule)

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
  	"status": 201,
  	"data": [
  		{
  			"a_teamName": "NS",
  			"b_teamName": "HLE",
  			"a_teamIcon": "https://cdn.pandascore.co/images/team/image/128217/nongshim_red_forcelogo_square.png",
  			"b_teamIcon": "https://cdn.pandascore.co/images/team/image/2883/hanwha-life-esports-1s04vbu0.png",
  			"a_teamScore": 2,
  			"b_teamScore": 1,
  			"status": 1,
  			"startTime": "2021-08-01T17:00:00.000Z",
  			"gameKey": 100011557
  		},
  		{
  			"a_teamName": "DK",
  			"b_teamName": "KT",
  			"a_teamIcon": "https://cdn.pandascore.co/images/team/image/128409/dwg_ki_alogo_square.png",
  			"b_teamIcon": "https://cdn.pandascore.co/images/team/image/63/kt_rolsterlogo_profile.png",
  			"a_teamScore": 2,
  			"b_teamScore": 0,
  			"status": 1,
  			"startTime": "2021-08-01T20:00:00.000Z",
  			"gameKey": 100011558
  		}
  	]
  }
  ```

  - | Field            | Type    | Description                                                 |
    | ---------------- | ------- | ----------------------------------------------------------- |
    | success          | boolean | 응답 성공 여부                                              |
    | status           | number  | Status Code                                                 |
    | data             | List    | 해당 월에 존재하는 경기 정보들                              |
    | data.a_teamName  | string  | A팀 이름                                                    |
    | data.b_teamName  | string  | B팀 이름                                                    |
    | data.a_teamIcon  | string  | A팀 아이콘 URL                                              |
    | data.b_teamIcon  | string  | B팀 아이콘 URL                                              |
    | data.a_teamScore | number  | A팀 스코어                                                  |
    | data.b_teamScore | number  | B팀 스코어                                                  |
    | data.status      | number  | 해당 경기의 상태 ex) -1 : 경기 전, 0 : 경기 중, 1 : 경기 끝 |
    | data.startTime   | Date    | 경기 시작 시간                                              |
    | data.gameKey     | number  | 해당 경기의 세부 내용을 조회하기 위해 필요한 KEY            |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "Internel Error"
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
  	"status": 201,
  	"data": [
  		{
  			"rank": 1,
  			"name": "NS",
  			"icon": "https://cdn.pandascore.co/images/team/image/128217/nongshim_red_forcelogo_square.png",
  			"win": 11,
  			"lose": 4,
  			"rate": 73,
  			"key": 100000436
  		},
  		{
  			"rank": 2,
  			"name": "GEN",
  			"icon": "https://cdn.pandascore.co/images/team/image/2882/geng-hooir6i9.png",
  			"win": 10,
  			"lose": 4,
  			"rate": 71,
  			"key": 100000064
  		}
  	]
  }
  ```

  - | Field     | Type    | Description          |
    | --------- | ------- | -------------------- |
    | success   | boolean | 응답 성공 여부       |
    | status    | number  | Status Code          |
    | data      | List    | LCK 팀들             |
    | data.rank | number  | 팀 순위              |
    | data.name | string  | 팀 이름              |
    | data.icon | string  | 팀 아이콘 URL        |
    | data.win  | number  | 팀 승리 수           |
    | data.lose | number  | 팀 패배 수           |
    | data.rate | number  | 팀 승률              |
    | data.key  | number  | 해당 팀에 대한 key값 |

- fail
  ```json
  {
  	"success": false,
  	"status": 500,
  	"msg": "Internel Error"
  }
  ```

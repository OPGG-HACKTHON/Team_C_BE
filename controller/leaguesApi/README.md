`해당 문서 및 API는 장효택이 작성했으며 궁금하신 부분있으면 언제든 연락주세요!`

[updateTeamRank](#updateTeamRank)

[initTeamInfo](#initTeamInfo)

[initPlayerInfo](#initPlayerInfo)

[updateTeamRank](#updateTeamRank)

[initSchedule](#initSchedule)

[updateSchedule](#updateSchedule)

## 외부 API, 크롤링을 통한 데이터 핸들링 파트

### 서버에서 사용할 API들입니다.

## Base URL

`http://3.37.194.249/leaguesApi`

## updateTeamRank

### description

특정 기간(매일) 해당 메소드를 호출하여 qwer.gg에서 순위 기록을 크롤링해서 업데이트 해줍니다. (cron으로 매일 스케줄링할 api)

### Req

- method

  `PUT`

- url

  `/teamRank`

### Res

```json
{
	"success": true,
	"status": 201,
	"data": "팀 테이블 업데이트를 완료했습니다."
}
```

## initTeamInfo

### description

팀 이름, 이미지 등의 팀 정보를 생성해줍니다.

### Req

- method

  `POST`

- url

  `/teamInit`

### Res

```json
{
	"success": true,
	"status": 201,
	"data": "팀 정보 생성을 완료했습니다."
}
```

## initPlayerInfo

### description

플레이어의 이름, 라인, 프로필 이미지 등의 정보를 생성합니다.

### Req

- method

  `POST`

- url

  `/player`

### Res

```json
{
	"success": true,
	"status": 201,
	"data": "플레이어 정보 생성을 완료했습니다."
}
```

## addAPIKeys

### description

팀과 선수에 타 API를 사용하기 위해 필요한 api key 값을 주입합니다.

### Req

- method

  `POST`

- url

  `/apiKeys`

### Res

```json
{
	"success": true,
	"status": 201,
	"data": "API Key 세팅을 완료했습니다."
}
```

## initSchedule

### description

테이블에 일정을 추가하는 api입니다.

### method

`POST`

### url

`/schedule`

### Res

```json
{
	"success": true,
	"status": 201,
	"data": "일정 생성을 완료했습니다."
}
```

## updateSchedule

### description

SportsData API를 통해 경기의 내용을 받아와서 DB에 업데이트 하는 메소드. 이를 통해 경기의 세트 스코어, 경기 진행 상태, 종료 시간을 업데이트함. (cron으로 스케줄링할 api)

### Req

- method

  `PUT`

- url

  `/schedule`

### Res

```json
{
	"success": true,
	"status": 201,
	"data": "일정 업데이트를 완료했습니다."
}
```

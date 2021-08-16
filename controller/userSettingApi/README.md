`해당 문서 및 API는 이정표가 작성했으며 궁금하신 부분있으면 언제든 연락주세요!`

[updateNickname](#updateNickname)

[updateTeamId](#updateTeamId)

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

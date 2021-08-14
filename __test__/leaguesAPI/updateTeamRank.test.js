const { server, sessionStore } = require("../../app");
const request = require("supertest");

afterAll(async () => {
  server.close();
});

describe("PUT /leaguesApi/teamRank", () => {
  test("updateTeamRank's output is 팀 테이블 업데이트를 완료했습니다.", async () => {
    const res = await request(server)
      .put("/leaguesApi/teamRank")
      .set("Accept", "application/json");

    if (res.body.status != 201) {
      expect(res.body.msg).toEqual("수동 크롤링에 문제가 생겼습니다.");
    } else {
      expect(res.body.data).toEqual("팀 테이블 업데이트를 완료했습니다.");
    }
  });
});

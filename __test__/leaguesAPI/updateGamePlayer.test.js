const { server, sessionStore } = require("../../app");
const request = require("supertest");

jest.setTimeout(10000);

afterAll(async () => {
	sessionStore.close();
	server.close();
});

describe("PUT /leaguesApi/gamePlayer", () => {
	test("updategamePlayer's output is 현재 경기의 선수 업데이트를 완료했습니다.", async () => {
		const res = await request(server)
			.put("/leaguesApi/gamePlayer")
			.set("Accept", "application/json");

		expect(res.body.data).toEqual("현재 경기의 선수 업데이트를 완료했습니다.");
	});
});

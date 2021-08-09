const { server, sessionStore } = require("../../app");
const request = require("supertest");

afterAll(async () => {
	sessionStore.close();
	server.close();
});

describe("GET /info/teamInfo", () => {
	test("getTeamInfo's length is 10", async () => {
		const res = await request(server)
			.get("/info/teamInfo")
			.set("Accept", "application/json");

		expect(res.body.data.length).toBe(10);
	});
});

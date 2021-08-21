const { server, sessionStore } = require("../../app");
const request = require("supertest");

afterAll(async () => {
	server.close();
});

describe("GET /info/currentGame", () => {
	test("currentGame's status is 200", async () => {
		const res = await request(server)
			.get("/info/currentGame")
			.set("Accept", "application/json");

		expect(res.body.status).toBe(200);
	});
});

const { server, sessionStore } = require("../../app");
const request = require("supertest");

jest.setTimeout(10000);

afterAll(async () => {
	server.close();
});

describe("GET /info/schedule?month=8", () => {
	test("we got data.status 200", async () => {
		const res = await request(server)
			.get("/info/schedule")
			.query({ month: 8 })
			.set("Accept", "application/json");

		expect(res.body.status).toBe(200);
	});
});

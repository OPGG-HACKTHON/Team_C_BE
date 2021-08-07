const server = require("../../app");
const request = require("supertest");

afterAll(() => {
	server.close();
});

describe("GET /info/schedule?month=8", () => {
	test("we got data.status 201", async () => {
		const res = await request(server)
			.get("/info/schedule")
			.query({ month: 8 })
			.set("Accept", "application/json");

		expect(res.body.status).toBe(201);
	});
});

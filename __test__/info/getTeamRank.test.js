const server = require("../../app");
const request = require("supertest");

jest.setTimeout(10000);

afterAll(() => {
	server.close();
});

describe("GET /info/teamRank", () => {
	test("getTeamRank's length is 10", async () => {
		const res = await request(server)
			.get("/info/teamRank")
			.set("Accept", "application/json");

		expect(res.body.data.length).toBe(10);
	});
});

const { server, sessionStore } = require("../../app");
const request = require("supertest");

afterAll(async () => {
	sessionStore.close();
	server.close();
});

describe("GET /pog/list", () => {
	test("getPOGList has aTeam, bTeam", async () => {
		const res = await request(server)
			.get("/pog/list")
			.set("Accept", "application/json");

		expect(res.body.data.aTeam).not.toBeNull();
		expect(res.body.data.bTeam).not.toBeNull();
	});
});

const teamService = require("../../service/leaguesAPI/team");

test("getTeamRankInfo's length is 10", async () => {
	try {
		const body = await teamService.getTeamRankInfo();
		const teamRankInfo = teamService.parseTeamRankInfo(body);

		expect(teamRankInfo.length).toBe(10);
	} catch (error) {
		expect(error).toBe("수동 크롤링에 문제가 생겼습니다.");
	}
});
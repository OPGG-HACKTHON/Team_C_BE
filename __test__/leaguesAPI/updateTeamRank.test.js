const { getTeamRankInfo } = require("../../service/leaguesAPI/getTeamRank");

test("getTeamRankInfo's length is 10", async () => {
	try {
		const teamRankInfo = await getTeamRankInfo();
		expect(teamRankInfo.length).toBe(10);
	} catch (error) {
		expect(error).toBe("수동 크롤링에 문제가 생겼습니다.");
	}
});

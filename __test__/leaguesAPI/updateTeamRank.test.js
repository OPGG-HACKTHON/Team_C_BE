const { getTeamRankInfo } = require("../../service/leaguesAPI/getTeamRank");

test("getTeamRankInfo's length is 10", async () => {
	const teamRankInfo = await getTeamRankInfo();

	expect(teamRankInfo.length).toBe(10);
});

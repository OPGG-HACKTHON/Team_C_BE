const { getTeamRankInfo } = require("../../service/leaguesApi");
const team = require("../../dataAccess/team");
const resUtil = require("../../util/resUtil");

const updateTeamRank = async (req, res) => {
	try {
		const teamRankInfo = await getTeamRankInfo();
		await team.updateTeam(teamRankInfo);
		res.json(resUtil.success(201, "팀 테이블 업데이트를 완료했습니다."));
	} catch (error) {
		return res.json(resUtil.fail(500, error));
	}
};

module.exports = updateTeamRank;

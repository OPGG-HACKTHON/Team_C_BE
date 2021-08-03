const teamService = require("../../service/leaguesApi/team");
const team = require("../../dataAccess/team");
const resUtil = require("../../util/resUtil");

const updateTeamRank = async (req, res) => {
	const body = await teamService.getTeamRankInfo();
	const teamRankInfo = teamService.parseTeamRankInfo(body);
	await team.updateTeam(teamRankInfo);
	res.json(resUtil.success(201, "팀 테이블 업데이트를 완료했습니다."));
};

module.exports = updateTeamRank;

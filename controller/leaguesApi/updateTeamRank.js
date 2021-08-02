const teamRankService = require("../../service/leaguesAPI/teamRank");
const team = require("../../dataAccess/team");
const resUtil = require("../../util/resUtil");

const updateTeamRank = async (req, res) => {
	const body = await teamRankService.getTeamRankInfo();
	const teamRankInfo = teamRankService.parseTeamRankInfo(body);
	await teamRankService.updateTeamRank(teamRankInfo);
	res.json(resUtil.success(201, "팀 테이블 업데이트를 완료했습니다."));
};

module.exports = updateTeamRank;

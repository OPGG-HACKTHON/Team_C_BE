const teamInfoService = require("../../service/leaguesAPI/teamInfoWithPanda");
const resUtil = require("../../util/resUtil");

const initTeamInfo = async (req, res) => {
	const teamInfo = await teamInfoService.getTeamInfoWithPanda();
	await teamInfoService.createTeamInfo(teamInfo);

	res.json(resUtil.success(201, "팀 정보 생성을 완료했습니다."));
};

module.exports = initTeamInfo;

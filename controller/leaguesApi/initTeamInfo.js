const {
	getTeamInfoWithPanda,
} = require("../../service/leaguesAPI/teamInfoWithPanda");
const team = require("../../dataAccess/team");
const resUtil = require("../../util/resUtil");

const initTeamInfo = async (req, res) => {
	const teamInfo = await getTeamInfoWithPanda();
	await team.initTeamInfo(teamInfo);

	res.json(resUtil.success(201, "팀 정보 생성을 완료했습니다."));
};

module.exports = initTeamInfo;

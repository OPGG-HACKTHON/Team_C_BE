const playerService = require("../../service/leaguesAPI/player");
const team = require("../../dataAccess/team");
const resUtil = require("../../util/resUtil");

const initPlayerInfo = async (req, res) => {
	const playerInfo = await playerService.getPlayerInfo();

	await playerInfo.forEach(async (element) => {
		let teamInfo = await team.findTeamIdByName(element.name);
		await playerService.createPlayer(teamInfo, element.players);
	});

	res.json(resUtil.success(201, "플레이어 정보 생성을 완료했습니다."));
};

module.exports = initPlayerInfo;

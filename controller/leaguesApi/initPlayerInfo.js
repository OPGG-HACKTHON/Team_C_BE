const playerService = require("../../service/leaguesAPI/player");
const teamService = require("../../service/leaguesAPI/team");
const resUtil = require("../../util/resUtil");

const initPlayerInfo = async (req, res) => {
	const playerInfo = await playerService.getPlayerInfo();

	await playerInfo.forEach(async (element) => {
		let teamInfo = await teamService.getIdfindByName(element.name);
		await playerService.createPlayer(teamInfo, element.players);
	});

	res.json(resUtil.success(201, "플레이어 정보 생성을 완료했습니다."));
};

module.exports = initPlayerInfo;

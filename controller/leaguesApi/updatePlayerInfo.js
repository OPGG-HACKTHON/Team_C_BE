const teamRepo = require("../../dataAccess/team");
const resUtil = require("../../util/resUtil");
const playerRepo = require("../../dataAccess/player");
const sportsData = require("../../service/leaguesAPI/sportsData");

const updatePlayerInfo = async (req, res) => {
	const teamInfos = await teamRepo.getTeamKey();

	for (const info of teamInfos) {
		const infoData = info.dataValues;
		const players = await playerRepo.getPlayerKeyByTeamId(infoData.id);
		const playersFromAPI = await sportsData.getPlayersByTeamId(infoData.key);

		const playerSet = new Set();

		for (const player of players) {
			playerSet.add(player.dataValues.key);
		}

		for (const player of playersFromAPI) {
			if (!playerSet.has(player.PlayerId)) {
				await playerRepo.createPlayerBySportsData(infoData.id, player);
			}
		}
	}

	res.json(resUtil.success(201, "플레이어 정보 추가를 완료했습니다."));
};

module.exports = updatePlayerInfo;

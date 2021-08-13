const resUtil = require("../../util/resUtil");
const gamePlayerRepo = require("../../dataAccess/gamePlayer");
const gameRepo = require("../../dataAccess/game");
const teamRepo = require("../../dataAccess/team");
const playerRepo = require("../../dataAccess/player");

const getPOGList = async (req, res) => {
	const recentSchedule = await gameRepo.getRecentSchedule();
	const currentGameId = recentSchedule.dataValues.id;

	const pogList = await gamePlayerRepo.getGamePlayerByGameId(currentGameId);

	const curInfo = pogList[0].dataValues.game.dataValues;
	const aTeamId = curInfo.aTeamId;
	const bTeamId = curInfo.bTeamId;

	const aTeam = await teamRepo.findTeamInfoByKey(aTeamId);
	const bTeam = await teamRepo.findTeamInfoByKey(bTeamId);

	aTeam.dataValues.player = [];
	bTeam.dataValues.player = [];

	for (const rawPlayer of pogList) {
		const player = rawPlayer.dataValues;
		const playerInfo = await playerRepo.getPlayerByKey(player.playerKey);

		playerInfo.dataValues.gamePlayerId = player.id;

		if (playerInfo.dataValues.teamId == aTeam.id) {
			delete playerInfo.dataValues.teamId;
			aTeam.dataValues.player.push(playerInfo.dataValues);
		} else {
			delete playerInfo.dataValues.teamId;
			bTeam.dataValues.player.push(playerInfo.dataValues);
		}
	}
	res.json(resUtil.success(201, { aTeam, bTeam }));
};

module.exports = getPOGList;

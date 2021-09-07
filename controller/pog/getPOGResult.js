const resUtil = require("../../util/resUtil");
const gamePlayerRepo = require("../../dataAccess/gamePlayer");
const gameRepo = require("../../dataAccess/game");
const teamRepo = require("../../dataAccess/team");
const playerRepo = require("../../dataAccess/player");

const getPOGResult = async (req, res) => {
	const { gameId } = req.query;

	let currentGameId;

	if (gameId) {
		currentGameId = gameId;
	} else {
		const recentSchedule = await gameRepo.getRecentSchedule();
		currentGameId = recentSchedule.dataValues.id;
	}

	const pogList = await gamePlayerRepo.getGamePlayerByGameId(currentGameId);

	const curInfo = pogList[0].dataValues.game.dataValues;
	const aTeamId = curInfo.aTeamId;
	const bTeamId = curInfo.bTeamId;

	const countSum = await gamePlayerRepo.getPOGCntSum(currentGameId);

	const aTeam = await teamRepo.findTeamInfoByKey(aTeamId);
	const bTeam = await teamRepo.findTeamInfoByKey(bTeamId);

	aTeam.dataValues.player = [];
	bTeam.dataValues.player = [];

	for (const rawPlayer of pogList) {
		const player = rawPlayer.dataValues;
		const playerInfo = await playerRepo.getPlayerByKey(player.playerKey);

		playerInfo.dataValues.gamePlayerId = player.id;
		playerInfo.dataValues.count = rawPlayer.dataValues.count;
		let rate = (rawPlayer.dataValues.count * 100) / countSum;
		rate = Math.floor(rate * 100);
		rate /= 100;
		playerInfo.dataValues.rate = rate;

		if (playerInfo.dataValues.teamId == aTeam.id) {
			delete playerInfo.dataValues.teamId;
			aTeam.dataValues.player.push(playerInfo.dataValues);
		} else {
			delete playerInfo.dataValues.teamId;
			bTeam.dataValues.player.push(playerInfo.dataValues);
		}
	}

	aTeam.dataValues.player.sort((a, b) => {
		return b.count - a.count;
	});
	bTeam.dataValues.player.sort((a, b) => {
		return b.count - a.count;
	});

	let curRank = 0;
	let curCnt = -1;

	for (const player of aTeam.dataValues.player) {
		if (curCnt != player.count) {
			curRank += 1;
		}
		curCnt = player.count;
		player.rateRank = curRank;
	}

	curRank = 0;
	curCnt = -1;

	for (const player of bTeam.dataValues.player) {
		if (curCnt != player.count) {
			curRank += 1;
		}
		curCnt = player.count;
		player.rateRank = curRank;
	}

	res.json(resUtil.success(200, { aTeam, bTeam }));
};

module.exports = getPOGResult;

const resUtil = require("../../util/resUtil");
const POGRepo = require("../../dataAccess/POG");
const gamePlayerRepo = require("../../dataAccess/gamePlayer");
const gameRepo = require("../../dataAccess/game");
const { logger } = require("../../config/winston");
const moment = require("moment");

const pushGame = async (req, res) => {
	// 343 360

	const schedules = await gameRepo.getMonthSchedule(2021, 6);

	let cur = 0;
	let gameId = 376;

	for (let i = 271; i < 281; i++) {
		const players = await gamePlayerRepo.getGamePlayerByGameId(i);
		let gameInfo = {
			aTeamId: schedules[cur].dataValues.aTeamId,
			bTeamId: schedules[cur].dataValues.bTeamId,
			aTeamScore: schedules[cur].dataValues.aTeamScore,
			bTeamScore: schedules[cur].dataValues.bTeamScore,
			startTime: moment(schedules[cur].dataValues.startTime).add(3, "months"),
			status: schedules[cur].dataValues.status,
			gameId: null,
		};
		cur += 1;
		await gameRepo.createSchedule(gameInfo);

		for (const player of players) {
			let cnt = getRandomInt(100, 3000);
			await gamePlayerRepo.createExampleGamePlayer(
				player.dataValues.playerKey,
				gameId,
				cnt
			);
		}
		gameId += 1;
	}

	res.json(resUtil.success(201, "완료했습니다."));
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

module.exports = pushGame;

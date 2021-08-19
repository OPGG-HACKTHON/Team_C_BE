const sportsData = require("../../service/leaguesAPI/sportsData");
const game = require("../../dataAccess/game");
const resUtil = require("../../util/resUtil");
const gamePlayer = require("../../dataAccess/gamePlayer");
const player = require("../../dataAccess/player");
const topTinder = require("../../dataAccess/topTinder");
const tinder = require("../../dataAccess/tinder");

const updateSchedule = async (req, res) => {
	const schedules = await sportsData.getScheduleByRoundId();
	const recentSchedule = await game.getRecentSchedule();
	const recentGameInDB = recentSchedule.dataValues;
	let recentGame;

	await schedules.forEach(async (schedule) => {
		if (schedule.GameId == recentGameInDB.key) {
			recentGame = schedule;
		}
	});

	const resultSchedule = sportsData.compareSchedule(recentGameInDB, recentGame);

	// finishedGame 발동
	if (recentGameInDB.status == 1 && resultSchedule.status == 2) {
		const gameId = recentGameInDB.id;
		// save pog. pog 점수 업데이트
		const pogPlayer = await gamePlayer.getPOGByGameId(gameId);
		const pogKey = pogPlayer.dataValues.playerKey;
		let point = await player.getPointByKey(pogKey);
		const newPoint = point.dataValues.point + 100;
		await player.updatePOGPoint(pogKey, newPoint);

		// save top tinder, top 10 뽑기
		const allTinder = await tinder.getAllTinderByGameId(gameId);

		allTinder.sort((a, b) => {
			let aCnt =
				a.dataValues.like + a.dataValues.superlike - a.dataValues.dislike;
			let bCnt =
				b.dataValues.like + b.dataValues.superlike - b.dataValues.dislike;

			return bCnt - aCnt;
		});

		let rank = 1;
		for (const curTinder of allTinder) {
			if (rank > 10) break;
			await topTinder.createTopTinder(curTinder.dataValues, rank);
			rank += 1;
		}
	}

	await game.updateSchedule(resultSchedule, recentGameInDB.key);

	res.json(resUtil.success(201, "일정 업데이트를 완료했습니다."));
};

module.exports = updateSchedule;

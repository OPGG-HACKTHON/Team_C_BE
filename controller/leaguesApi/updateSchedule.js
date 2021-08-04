const sportsData = require("../../service/leaguesAPI/sportsData");
const game = require("../../dataAccess/game");
const adjustTime = require("../../util/adjustTime");
const resUtil = require("../../util/resUtil");

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

	await game.updateSchedule(resultSchedule, recentGameInDB.key);

	res.json(resUtil.success(201, "일정 업데이트를 완료했습니다."));
};

module.exports = updateSchedule;

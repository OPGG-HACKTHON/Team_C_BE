const resUtil = require("../../util/resUtil");
const gameRepo = require("../../dataAccess/game");
const scheduleService = require("../../service/info/schedule");

const getCurrentGame = async (req, res) => {
	const lastFinishedGame = await gameRepo.getLastFinishedSchedule();

	if (
		new Date() <
		new Date(
			Date.parse(lastFinishedGame.dataValues.finishedAt) + 1000 * 60 * 30
		)
	) {
		return res.json(resUtil.success(201, lastFinishedGame));
	}

	const currentGame = await gameRepo.getCurrentSchedule();
	if (currentGame == null) {
		return res.json(resUtil.success(201, currentGame));
	}
	const parsedCurGame = await scheduleService.parseCurGame(
		currentGame.dataValues
	);

	res.json(resUtil.success(201, parsedCurGame));
};

module.exports = getCurrentGame;

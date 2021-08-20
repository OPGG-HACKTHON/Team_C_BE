const resUtil = require("../../util/resUtil");
const gameRepo = require("../../dataAccess/game");
const scheduleService = require("../../service/info/schedule");

const getCurrentGame = async (req, res) => {
	const currentGame = await gameRepo.getCurrentSchedule();
	if (currentGame == null) {
		return res.json(resUtil.success(200, currentGame));
	}
	const parsedCurGame = await scheduleService.parseCurGame(
		currentGame.dataValues
	);

	res.json(resUtil.success(200, parsedCurGame));
};

module.exports = getCurrentGame;

const resUtil = require("../../util/resUtil");
const gameRepo = require("../../dataAccess/game");
const scheduleService = require("../../service/info/schedule");

const getCurrentGame = async (req, res) => {
	const { gameId } = req.query;

	const gameResult = await gameRepo.getGameById(gameId);
	const gameList = await scheduleService.parseGame(gameResult);

	res.json(resUtil.success(200, gameList));
};

module.exports = getCurrentGame;

const resUtil = require("../../util/resUtil");
const gameRepo = require("../../dataAccess/game");
const scheduleService = require("../../service/info/schedule");
const getSchedule = async (req, res) => {
	const { month } = req.query;

	const monthSchedule = await gameRepo.getMonthSchedule(month);
	const gameList = await scheduleService.parseGameList(monthSchedule);

	res.json(resUtil.success(200, gameList));
};

module.exports = getSchedule;

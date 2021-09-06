const resUtil = require("../../util/resUtil");
const gameRepo = require("../../dataAccess/game");
const scheduleService = require("../../service/info/schedule");
const getSchedule = async (req, res) => {
	const { year, month } = req.query;
	const monthSchedule = await gameRepo.getMonthSchedule(year, month);
	const gameList = await scheduleService.parseGameList(monthSchedule);

	res.json(resUtil.success(200, gameList));
};

module.exports = getSchedule;

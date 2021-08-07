const sportsData = require("../../service/leaguesAPI/sportsData");
const game = require("../../dataAccess/game");
const adjustTime = require("../../util/adjustTime");
const resUtil = require("../../util/resUtil");

const initSchedule = async (req, res) => {
	const schedules = await sportsData.getScheduleByRoundId();

	await schedules.forEach(async (schedule) => {
		const time = adjustTime(schedule.DateTime);
		await sportsData.createSchedule(schedule, time);
	});

	res.json(resUtil.success(201, "일정 생성을 완료했습니다."));
};

module.exports = initSchedule;

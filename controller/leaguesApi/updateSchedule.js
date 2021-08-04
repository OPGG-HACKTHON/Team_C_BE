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
	console.log(recentGame);

	// recent 가 -1인데 경기 시작 시간이 지났으면 0으로 바꿔줌
	// 스코어도 0 0으로 ㅇㅇ!
	// 스코어는 계속 업데이트, 스코어 null이면 기존거 사용
	// 스코어 한 팀이 3가되면 finishedAt, 1로 바꿈
	// score, status, finishedAt만 다루면 됨

	res.json(resUtil.success(201, "일정 업데이트를 완료했습니다."));
};

module.exports = updateSchedule;

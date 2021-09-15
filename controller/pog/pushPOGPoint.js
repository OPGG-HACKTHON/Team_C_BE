const resUtil = require("../../util/resUtil");
const playerRepo = require("../../dataAccess/player");

const pushPOGPoint = async (req, res) => {
	const players = await playerRepo.getAllPlayer();

	for (const player of players) {
		let point = getRandomInt(0, 5) * 100;
		await playerRepo.updatePOGPoint(player.dataValues.key, point);
	}

	res.json(resUtil.success(200, "완료했습니다."));
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

module.exports = pushPOGPoint;

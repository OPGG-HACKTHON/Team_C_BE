const resUtil = require("../../util/resUtil");
const POGRepo = require("../../dataAccess/POG");
const gamePlayerRepo = require("../../dataAccess/gamePlayer");
const { logger } = require("../../config/winston");

const pushPOGCnt = async (req, res) => {
	// 343 360

	for (let i = 271; i < 343; i++) {
		const players = await gamePlayerRepo.getGamePlayerByGameId(i);

		for (const player of players) {
			let cnt = getRandomInt(100, 3000);
			await gamePlayerRepo.updateCount(player.dataValues.id, cnt);
		}
	}

	res.json(resUtil.success(201, "완료했습니다."));
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

module.exports = pushPOGCnt;

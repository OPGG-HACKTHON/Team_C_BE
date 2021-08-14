const resUtil = require("../../util/resUtil");
const userRepo = require("../../dataAccess/user");
const POGRepo = require("../../dataAccess/POG");
const gamePlayerRepo = require("../../dataAccess/gamePlayer");

const votePOG = async (req, res) => {
	const { vote } = req.body;
	const userId = req.userId;

	for (const curVote of vote) {
		// pog repo logging
		await POGRepo.createPOGVote(curVote, userId);

		let curGamePlayer = await gamePlayerRepo.getGamePlayerByGamePlayerId(
			curVote.gamePlayerId
		);

		const newCnt = curGamePlayer.dataValues.count + curVote.count;

		await gamePlayerRepo.updateCount(curVote.gamePlayerId, newCnt);
	}

	res.json(resUtil.success(201, "투표를 완료했습니다."));
};

module.exports = votePOG;

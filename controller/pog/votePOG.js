const resUtil = require("../../util/resUtil");
const userRepo = require("../../dataAccess/user");
const POGRepo = require("../../dataAccess/POG");
const gamePlayerRepo = require("../../dataAccess/gamePlayer");

const votePOG = async (req, res) => {
	const { userUid, vote } = req.body;

	const userData = await userRepo.getUserIdByUid(userUid);
	if (userData == null)
		return res.json(
			resUtil.fail(400, "uid에 해당하는 id가 존재하지 않습니다.")
		);

	const userId = userData.dataValues.id;

	for (const curVote of vote) {
		// pog repo logging
		await POGRepo.createPOGVote(curVote, userId);

		let curGamePlayer = await gamePlayerRepo.getGamePlayerByGameId(
			curVote.gamePlayerId
		);

		const newCnt = curGamePlayer.dataValues.count + curVote.count;

		await gamePlayerRepo.updateCount(curVote.gamePlayerId, newCnt);
	}

	res.json(resUtil.success(201, "투표를 완료했습니다."));
};

module.exports = votePOG;

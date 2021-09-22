const resUtil = require("../../util/resUtil");
const tinderMethod = require("../../dataAccess/tinder");
const tinderRecordRepo = require("../../dataAccess/tinderRecord");
const updateLike = async (req, res) => {
	const { tinderId, like, dislike, superlike, pass } = req.body;
	const userId = req.userId;

	if (tinderId && like >= 0 && dislike >= 0 && superlike >= 0 && pass >= 0) {
		const body = {
			tinderId: tinderId,
			like: 0 + like,
			dislike: 0 + dislike,
			superlike: 0 + superlike,
			pass: 0 + pass,
		};

		const updateResult = await tinderMethod.updateLike(body);

		if (updateResult === "success") {
			return res.json(resUtil.success(200, "리액션 성공"));
		} else {
			return res.json(resUtil.fail(400, "리액션 실패"));
		}
	} else {
		res.json(resUtil.fail(400, "틴더id나 리액션정보가 부족합니다."));
	}

	//req.body 에서 tinderId, like, dislike, superlike, pass

	await tinderRecordRepo.createRecord(tinderId, userId);
};

module.exports = updateLike;

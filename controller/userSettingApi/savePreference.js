const resUtil = require("../../util/resUtil");
const preference = require("../../dataAccess/preference");

const savePreference = async (req, res) => {
	const userId = req.userId;
	const { players } = req.body;

	// 1. 기존 user preference 삭제
	await preference.deletePreferenceByUserId(userId);

	// 2. 새로운 preference 추가
	for (const playerId of players) {
		await preference.createPreference(userId, playerId);
	}

	return res.json(resUtil.success(201, "선호 선수 등록을 완료했습니다."));
};

module.exports = savePreference;

const resUtil = require("../../util/resUtil");
const preference = require("../../dataAccess/preference");
const userRepo = require("../../dataAccess/user");

const getProfile = async (req, res) => {
	const userId = req.userId;
	const dbProfile = await userRepo.getProfileByUid(userId);

	// 닉넴, 팀로고, 팀이름
	const profile = {
		teamIcon: dbProfile.dataValues.team.dataValues.icon,
		teamName: dbProfile.dataValues.team.dataValues.name,
		nickname: dbProfile.dataValues.nickname,
	};

	return res.json(resUtil.success(200, profile));
};

module.exports = getProfile;

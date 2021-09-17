const resUtil = require("../../util/resUtil");
const preference = require("../../dataAccess/preference");
const userRepo = require("../../dataAccess/user");

const getProfile = async (req, res) => {
	const userId = req.userId;
	const dbProfile = await userRepo.getProfileByUid(userId);

	//	닉넴, 팀로고, 팀이름
	const profile = {
		nickname: dbProfile.dataValues.nickname,
		teamIcon: null,
		teamName: null,
	};

	if (dbProfile.dataValues.teamId != null) {
		profile.teamIcon = dbProfile.dataValues.team.dataValues.icon;
		profile.teamName = dbProfile.dataValues.team.dataValues.name;
	}

	return res.json(resUtil.success(200, profile));
};

module.exports = getProfile;

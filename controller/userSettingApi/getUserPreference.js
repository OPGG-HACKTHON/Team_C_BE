const resUtil = require("../../util/resUtil");
const preference = require("../../dataAccess/preference");

const getUserPreference = async (req, res) => {
	const userId = req.userId;

	const players = await preference.getUserPreference(userId);

	const output = [];
	for (const player of players) {
		output.push(player.dataValues.player);
	}

	return res.json(resUtil.success(200, output));
};

module.exports = getUserPreference;

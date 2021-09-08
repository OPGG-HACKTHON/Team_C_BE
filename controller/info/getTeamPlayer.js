const resUtil = require("../../util/resUtil");
const playerRepo = require("../../dataAccess/player");

const getTeamPlayer = async (req, res) => {
	const { teamId } = req.query;

	const players = await playerRepo.getPlayerByTeamId(teamId);

	res.json(resUtil.success(200, players));
};

module.exports = getTeamPlayer;

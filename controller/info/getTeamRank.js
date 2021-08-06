const resUtil = require("../../util/resUtil");
const teamRepo = require("../../dataAccess/team");

const getTeamRank = async (req, res) => {
	const teamRank = await teamRepo.getTeamRank();

	res.json(resUtil.success(201, teamRank));
};

module.exports = getTeamRank;

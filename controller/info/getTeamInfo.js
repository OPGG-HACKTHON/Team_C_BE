const resUtil = require("../../util/resUtil");
const teamRepo = require("../../dataAccess/team");

const getTeamInfo = async (req, res) => {
	const teamInfo = await teamRepo.getTeamInfo();

	res.json(resUtil.success(201, teamInfo));
};

module.exports = getTeamInfo;

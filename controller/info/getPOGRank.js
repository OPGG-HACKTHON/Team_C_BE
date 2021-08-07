const resUtil = require("../../util/resUtil");
const playerRepo = require("../../dataAccess/player");

const getPOGRank = async (req, res) => {
	const pogRank = await playerRepo.getPOGRank();

	res.json(resUtil.success(201, pogRank));
};

module.exports = getPOGRank;

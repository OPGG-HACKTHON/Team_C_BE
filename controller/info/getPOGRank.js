const resUtil = require("../../util/resUtil");
const playerRepo = require("../../dataAccess/player");

const getPOGRank = async (req, res) => {
	const pogRank = await playerRepo.getPOGRank();

	let rank = 1;
	for (const player of pogRank) {
		player.dataValues.rank = rank;
		rank += 1;
	}

	res.json(resUtil.success(200, pogRank));
};

module.exports = getPOGRank;

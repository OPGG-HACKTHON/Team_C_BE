const userRepo = require("../dataAccess/user");
const resUtil = require("../util/resUtil");

const create = async (req, res) => {
	const { name, age } = req.body;

	try {
		await userRepo.create(name, age);
	} catch (error) {
		console.error(error);
		res.json(resUtil.fail(500, "에러 travis 테스트"));
	}

	res.json(resUtil.success(200, "굿 travis 테스트"));
};

module.exports = create;

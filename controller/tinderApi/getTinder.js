const resUtil = require("../../util/resUtil");

const getTinder = async (req, res) => {
	// filter는 받기 싫은 팀 목록 ,로 연결 됨
	const { count, filter } = req.query;

	const filterArray = filter.split(",");

	console.log(count, filterArray);

	res.send("good");
};

module.exports = getTinder;

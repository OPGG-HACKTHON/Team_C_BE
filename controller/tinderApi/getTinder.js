const resUtil = require("../../util/resUtil");
const tinderRepo = require("../../dataAccess/tinder");
const tinderRecordRepo = require("../../dataAccess/tinderRecord");
const tinderService = require("../../service/tinder/tinder");

const getTinder = async (req, res) => {
	// filter는 받기 싫은 팀 목록 ,로 연결 됨
	const userId = req.userId;
	const { count, filter } = req.query;
	const filterArray = filter.split(",");

	// 1. tinder에서 1분내 틴더, filter 거쳐서 갖고오기, userId 내꺼 빼고
	const tinders = await tinderRepo.getTinder(userId, filterArray);

	// 2. 1의 틴더를 랜덤으로 꺼내고, 검색해서 내 userId 있으면 패스, 좋아요 비교해서 검증, 없으면 리스트에 담음 (count 개수만큼)
	const processedTinders = await tinderService.selectTinderWithCount(
		tinders,
		count,
		userId
	);

	// 3. 2로 만든 리스트 record기록 및 뱉기
	for await (const tinder of processedTinders) {
		await tinderRecordRepo.createRecord(tinder, userId);
	}

	res.json(resUtil.success(200, processedTinders));
};

module.exports = getTinder;

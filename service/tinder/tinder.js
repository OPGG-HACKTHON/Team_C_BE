const tinderRecord = require("../../dataAccess/tinderRecord");

selectTinderWithCount = (tinders, count, userId) => {
	return new Promise(async (res, rej) => {
		const processedTinders = [];

		tinders.sort(() => Math.random() - 0.5);

		for await (const tinder of tinders) {
			if (count == 0) break;

			// count 10개 넘는지, 그리고 그 정책따라서 ㅇㅇ if문 continue
			const curCnt = 10 + tinder.like + tinder.superlike - tinder.dislike;
			if (curCnt < 0) continue;

			// 중복 아니면 트루
			// const checkDup = await checkDuplicate(tinder, userId);

			// if (checkDup) {
			count -= 1;
			processedTinders.push(tinder);
			// }
		}

		res(processedTinders);
	});
};

checkDuplicate = (tinder, userId) => {
	return new Promise(async (res, rej) => {
		const tinderId = tinder.id;
		const records = await tinderRecord.getRecordsByTinderId(tinderId);

		for await (const record of records) {
			if (record.dataValues.userId == userId) return res(false);
		}
		res(true);
	});
};

module.exports = { selectTinderWithCount, checkDuplicate };

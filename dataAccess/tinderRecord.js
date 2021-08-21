const { TinderRecord } = require("../models/index");

module.exports = {
	getRecordsByTinderId: (tinderId) => {
		return new Promise((res, rej) => {
			TinderRecord.findAll({
				where: { tinderId: tinderId },
			})
				.then(async (tinderRecords) => {
					res(tinderRecords);
				})
				.catch((err) => {
					rej(err);
				});
		});
	},
	createRecord: (tinder, userId) => {
		return new Promise(async (res, rej) => {
			await TinderRecord.create({
				tinderId: tinder.id,
				userId: userId,
			});
			res("success create record");
		});
	},
};

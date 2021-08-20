const { TopTinder } = require("../models/index");

module.exports = {
	createTopTinder: (tinder, rank) => {
		return new Promise((res, rej) => {
			TopTinder.create({
				rank: rank,
				tinderId: tinder.id,
			})
				.then(async (tinder) => {
					res("success");
				})
				.catch((err) => {
					rej(err);
				});
		});
	},
};

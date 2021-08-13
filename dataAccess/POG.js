const { POG } = require("../models/index");
const { Op } = require("sequelize");

module.exports = {
	createPOGVote: (curVote, userId) => {
		return new Promise((res, rej) => {
			POG.create({
				count: curVote.count,
				gamePlayerId: curVote.gamePlayerId,
				userId: userId,
			})
				.then(() => {
					res("success");
				})
				.catch((err) => {
					rej(err);
				});
		});
	},
};

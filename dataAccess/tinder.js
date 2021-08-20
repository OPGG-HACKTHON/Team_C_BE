const { Tinder } = require("../models/index");
const { User } = require("../models/index");

module.exports = {
	createTinder: (body) => {
		return new Promise((res, rej) => {
			Tinder.create({
				message: body.msg,
				userId: body.userId,
				teamId: body.teamId,
				gameId: body.gameId,
			})
				.then(async (tinder) => {
					res("success");
				})
				.catch((err) => {
					rej(err);
				});
		});
	},
	getAllTinderByGameId: (gameId) => {
		return new Promise(async (res, rej) => {
			const result = await Tinder.findAll({
				where: { gameId: gameId },
			});
			res(result);
		});
	},
};

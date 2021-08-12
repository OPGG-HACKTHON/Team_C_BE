const { GamePlayer } = require("../models/index");
const { Op } = require("sequelize");

module.exports = {
	getGamePlayerByGameId: (gameId) => {
		return new Promise(async (res, rej) => {
			const result = await GamePlayer.findAll({
				where: {
					gameId: gameId,
				},
			});
			res(result);
		});
	},
	createGamePlayer: (player, gameId) => {
		return new Promise((res, rej) => {
			GamePlayer.create({
				count: 0,
				playerKey: player,
				gameId: gameId,
			})
				.then(() => {
					res("success insert game");
				})
				.catch((err) => {
					rej(err);
				});
		});
	},
};

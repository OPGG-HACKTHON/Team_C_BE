const { GamePlayer } = require("../models/index");
const { Game } = require("../models/index");
const { Op } = require("sequelize");

module.exports = {
	getGamePlayerByGameId: (gameId) => {
		return new Promise(async (res, rej) => {
			const result = await GamePlayer.findAll({
				include: [{ model: Game, attributes: ["aTeamId", "bTeamId"] }],
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
	getPOGCntSum: (gameId) => {
		return new Promise((res, rej) => {
			GamePlayer.sum("count", { where: { gameId: gameId } }).then((sum) => {
				res(sum);
			});
		});
	},
	getGamePlayerByGamePlayerId: (gamePlayerId) => {
		return new Promise(async (res, rej) => {
			const result = await GamePlayer.findOne({
				where: {
					id: gamePlayerId,
				},
			});
			res(result);
		});
	},
	updateCount: (gamePlayerId, count) => {
		return new Promise((res, rej) => {
			GamePlayer.update(
				{
					count: count,
				},
				{ where: { id: gamePlayerId } }
			)
				.then(() => {
					res("success");
				})
				.catch((err) => {
					rej(err);
				});
		});
	},
	getPOGByGameId: (gameId) => {
		return new Promise(async (res, rej) => {
			const result = await GamePlayer.findOne({
				order: [["count", "DESC"]],
				where: {
					gameId: gameId,
				},
			});
			res(result);
		});
	},
	createExampleGamePlayer: (player, gameId, cnt) => {
		return new Promise((res, rej) => {
			GamePlayer.create({
				count: cnt,
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

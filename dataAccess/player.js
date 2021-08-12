const { Player } = require("../models/index");
const { Team } = require("../models/index");
const { Op } = require("sequelize");

module.exports = {
	createPlayer: (teamInfo, player) => {
		return new Promise((res, rej) => {
			Player.create({
				nickname: player.name,
				image: player.image_url,
				role: player.role,
				point: 0,
				teamId: teamInfo,
			})
				.then(() => {
					res("success init Player");
				})
				.catch((err) => {
					rej(err);
				});
		});
	},
	updatePlayerKey: (matchName, playerId) => {
		return new Promise((res, rej) => {
			Player.update(
				{
					key: playerId,
				},
				{
					where: { nickname: matchName },
				}
			)
				.then(() => {
					res("success update Player Key");
				})
				.catch((err) => {
					rej(err);
				});
		});
	},
	getPOGRank: () => {
		return new Promise(async (res, rej) => {
			const result = await Player.findAll({
				include: [{ model: Team, attributes: ["icon", "name"] }],
				order: [
					["point", "DESC"],
					["nickname", "ASC"],
				],
				attributes: ["nickname", "role", "point"],
			});
			res(result);
		});
	},
	getPlayerByKey: (key) => {
		return new Promise(async (res, rej) => {
			const result = await Player.findOne({
				attributes: ["nickname", "role", "image", "key", "teamId"],
				where: { key: key },
			});
			res(result);
		});
	},
};

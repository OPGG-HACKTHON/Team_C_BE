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
	createPlayerBySportsData: (teamInfo, player) => {
		return new Promise((res, rej) => {
			const playerRole = player.Position;
			let role = "";
			if (playerRole == "jungle") role = "jun";
			else if (playerRole == "ADC") role = "adc";
			else if (playerRole == "Support") role = "sup";
			else if (playerRole == "top") role = "top";
			else role = "mid";

			Player.create({
				nickname: player.MatchName,
				role: role,
				point: 0,
				teamId: teamInfo,
				key: player.PlayerId,
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
				include: [{ model: Team, attributes: ["icon", "name", "id"] }],
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
				attributes: ["nickname", "role", "image", "teamId"],
				where: { key: key },
			});
			res(result);
		});
	},
	getPlayerKeyByTeamId: (teamId) => {
		return new Promise(async (res, rej) => {
			const result = await Player.findAll({
				attributes: ["key"],
				where: { teamId: teamId },
			});
			res(result);
		});
	},
	updatePOGPoint: (key, point) => {
		return new Promise((res, rej) => {
			Player.update(
				{
					point: point,
				},
				{
					where: { key: key },
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
	getPointByKey: (key) => {
		return new Promise(async (res, rej) => {
			const result = await Player.findOne({
				attributes: ["point"],
				where: { key: key },
			});
			res(result);
		});
	},
	getPlayerByTeamId: (teamId) => {
		return new Promise(async (res, rej) => {
			const result = await Player.findAll({
				attributes: ["id", "nickname", "role", "image", "point", "key"],
				where: { teamId: teamId },
			});
			res(result);
		});
	},
	getAllPlayer: () => {
		return new Promise(async (res, rej) => {
			const result = await Player.findAll({});
			res(result);
		});
	},
};

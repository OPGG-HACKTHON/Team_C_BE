const { Preference } = require("../models/index");
const { Player } = require("../models/index");
const { Op } = require("sequelize");

module.exports = {
	deletePreferenceByUserId: (userId) => {
		return new Promise(async (res, rej) => {
			const result = await Preference.destroy({
				where: {
					userId: userId,
				},
			});
			res(result);
		});
	},
	createPreference: (userId, playerId) => {
		return new Promise(async (res, rej) => {
			const result = await Preference.create({
				userId: userId,
				playerId: playerId,
			});
			res(result);
		});
	},
	getUserPreference: (userId) => {
		return new Promise(async (res, rej) => {
			const result = await Preference.findAll({
				include: [
					{
						model: Player,
						attributes: ["id", "nickname", "role", "image", "point", "key"],
					},
				],
				attributes: ["userId"],
				where: { userId: userId },
			});
			res(result);
		});
	},
};

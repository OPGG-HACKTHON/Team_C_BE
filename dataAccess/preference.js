const { Preference } = require("../models/index");
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
};

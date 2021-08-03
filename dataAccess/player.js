const { Player } = require("../models/index");

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
};

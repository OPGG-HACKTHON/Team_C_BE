const { Player } = require("../models/index");

module.exports = {
	initPlayer: (teamId, playerInfo) => {
		return new Promise((res, rej) => {
			playerInfo.forEach((team) => {
				await this.createPlayer(teamId, team.players);
			});
		});
	},
	createPlayer: (team, players) => {
		return new Promise((res, rej) => {
			players.forEach((player) => {
				Player.create({
					nickname: player.name,
					image: player.icon,
					role: player.role,
					point: 0,
					teamId: team,
				})
					.then(() => {
						res("success init Player");
					})
					.catch((err) => {
						rej(err);
					});
			});
		});
	},
};

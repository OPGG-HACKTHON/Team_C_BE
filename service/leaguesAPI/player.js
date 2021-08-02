const request = require("request");

const playerRepo = require("../../dataAccess/player");

module.exports = {
	getPlayerInfo: () => {
		return new Promise((res, rej) => {
			const PANDA_KEY = process.env.PANDA_KEY;
			request(
				{
					url: `https://api.pandascore.co/lol/series/3659/teams?token=${PANDA_KEY}`,
					method: "GET",
				},
				(error, response, body) => {
					if (error) {
						console.error(error);
						return rej(error);
					}
					if (response.statusCode === 200) {
						const teamInfo = JSON.parse(body);
						const playerInfoArray = [];

						teamInfo.forEach((team) => {
							playerInfoArray.push({
								name: team.acronym,
								players: team.players,
							});
						});
						res(playerInfoArray);
					}
				}
			);
		});
	},
	createPlayer: (teamInfo, players) => {
		return new Promise(async (res, rej) => {
			await players.forEach(async (player) => {
				await playerRepo.createPlayer(teamInfo.dataValues.id, player);
			});
			res("success create player data");
		});
	},
};

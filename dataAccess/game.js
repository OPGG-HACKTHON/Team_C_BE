const { Game } = require("../models/index");

module.exports = {
	createSchedule: (gameInfo) => {
		return new Promise((res, rej) => {
			Game.create({
				a_team_id: gameInfo.a_team_id,
				b_team_id: gameInfo.b_team_id,
				a_team_score: gameInfo.a_team_score,
				b_team_score: gameInfo.b_team_score,
				startTime: gameInfo.startTime,
				status: gameInfo.status,
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

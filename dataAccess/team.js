const { Team } = require("../models/index");

module.exports = {
	initTeamInfo: (teamInfo) => {
		return new Promise((res, rej) => {
			teamInfo.forEach((element) => {
				Team.create({
					name: element.name,
					icon: element.icon,
				})
					.then(() => {
						res("success init Team");
					})
					.catch((err) => {
						rej(err);
					});
			});
		});
	},

	updateTeam: (teamRankInfo) => {
		return new Promise((res, rej) => {
			teamRankInfo.forEach((element) => {
				Team.update(
					{
						rank: element.rank,
						win: element.win,
						lose: element.lose,
						rate: element.rate,
					},
					{ where: { name: element.name } }
				)
					.then(() => {
						res("success update Team tables");
					})
					.catch((err) => {
						rej(err);
					});
			});
		});
	},
};

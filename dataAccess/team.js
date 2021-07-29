const { Team } = require("../models/index");

module.exports = {
	updateTeam: (teamRankInfo) => {
		return new Promise((resolve, reject) => {
			teamRankInfo.forEach((element) => {
				Team.update(
					{
						name: element.name,
						rank: element.rank,
						win: element.win,
						lose: element.lose,
						rate: element.rate,
					},
					{ where: { name: element.name } }
				)
					.then(() => {
						resolve("success update Team tables");
					})
					.catch((err) => {
						reject(err);
					});
			});
		});
	},
};

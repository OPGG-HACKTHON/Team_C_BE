const { Team } = require("../models/index");
const { Op } = require("sequelize");

module.exports = {
	createTeamInfo: (teamInfo) => {
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
	findTeamIdByName: (name) => {
		return new Promise(async (res, rej) => {
			const result = await Team.findAll({
				attributes: ["id", "name"],
				where: {
					name: name,
				},
			});
			res(result[0]);
		});
	},
	findTeamByKey: (key) => {
		return new Promise(async (res, rej) => {
			const result = await Team.findOne({
				where: {
					key: key,
				},
			});
			res(result);
		});
	},
	findTeamMinInfoByKey: (key) => {
		return new Promise(async (res, rej) => {
			const result = await Team.findOne({
				attributes: ["name", "icon"],
				where: {
					key: key,
				},
			});
			res(result);
		});
	},
	updateTeamKey: (teamInfo) => {
		return new Promise((res, rej) => {
			Team.update(
				{
					key: teamInfo.TeamId,
				},
				{ where: { name: teamInfo.Key } }
			)
				.then(() => {
					res("success update Team tables");
				})
				.catch((err) => {
					rej(err);
				});
		});
	},
	getTeamRank: () => {
		return new Promise(async (res, rej) => {
			const result = await Team.findAll({
				order: [["rank", "ASC"]],
				attributes: ["id", "rank", "name", "icon", "win", "lose", "rate"],
			});
			res(result);
		});
	},
	getTeamInfo: () => {
		return new Promise(async (res, rej) => {
			const result = await Team.findAll({
				order: [["name", "ASC"]],
				attributes: ["id", "name", "icon"],
			});
			res(result);
		});
	},
};

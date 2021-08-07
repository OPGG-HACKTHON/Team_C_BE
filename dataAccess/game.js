const { Game } = require("../models/index");
const { Team } = require("../models/index");
const { Op } = require("sequelize");

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
				key: gameInfo.gameId,
			})
				.then(() => {
					res("success insert game");
				})
				.catch((err) => {
					rej(err);
				});
		});
	},
	getRecentSchedule: () => {
		return new Promise(async (res, rej) => {
			const result = await Game.findOne({
				where: {
					[Op.or]: [{ status: 0 }, { status: -1 }],
				},
			});
			res(result);
		});
	},
	updateSchedule: (resultSchedule, key) => {
		return new Promise((res, rej) => {
			Game.update(
				{
					a_team_score: resultSchedule.a_team_score,
					b_team_score: resultSchedule.b_team_score,
					status: resultSchedule.status,
					finishedAt: resultSchedule.finishedAt,
				},
				{
					where: { key: key },
				}
			)
				.then(() => {
					res("success update game");
				})
				.catch((err) => {
					rej(err);
				});
		});
	},
	getMonthSchedule: (month) => {
		return new Promise(async (res, rej) => {
			curMonth = new Date(2021, month - 1, 1);
			nextMonth = new Date(2021, month, 1);

			const result = await Game.findAll(
				// { include: Team },
				{
					where: {
						[Op.and]: [
							{ startTime: { [Op.lt]: nextMonth } },
							{ startTime: { [Op.gte]: curMonth } },
						],
					},
				}
			);
			res(result);
		});
	},
};
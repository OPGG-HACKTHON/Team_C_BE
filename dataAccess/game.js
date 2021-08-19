const { Game } = require("../models/index");
const { Team } = require("../models/index");
const { Op } = require("sequelize");

module.exports = {
	createSchedule: (gameInfo) => {
		return new Promise((res, rej) => {
			Game.create({
				aTeamId: gameInfo.aTeamId,
				bTeamId: gameInfo.bTeamId,
				aTeamScore: gameInfo.aTeamScore,
				bTeamScore: gameInfo.bTeamScore,
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
					[Op.or]: [{ status: 1 }, { status: 0 }, { status: -1 }],
				},
			});
			res(result);
		});
	},
	updateSchedule: (resultSchedule, key) => {
		return new Promise((res, rej) => {
			Game.update(
				{
					aTeamScore: resultSchedule.aTeamScore,
					bTeamScore: resultSchedule.bTeamScore,
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
	getLastFinishedSchedule: () => {
		return new Promise(async (res, rej) => {
			const result = await Game.findOne({
				order: [["startTime", "DESC"]],
				attributes: [
					"id",
					"aTeamId",
					"bTeamId",
					"aTeamScore",
					"bTeamScore",
					"startTime",
					"finishedAt",
					"status",
				],
				where: {
					status: 1,
				},
			});
			res(result);
		});
	},
	getCurrentSchedule: () => {
		return new Promise(async (res, rej) => {
			const result = await Game.findOne({
				attributes: [
					"id",
					"aTeamId",
					"bTeamId",
					"aTeamScore",
					"bTeamScore",
					"startTime",
					"status",
				],
				where: {
					[Op.or]: [{ status: 0 }, { status: -1 }],
				},
			});
			res(result);
		});
	},
};

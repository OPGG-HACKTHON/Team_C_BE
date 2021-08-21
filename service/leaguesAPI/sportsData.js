const request = require("request");
const game = require("../../dataAccess/game");

module.exports = {
	getSeasonTeams: () => {
		return new Promise((res, rej) => {
			const SPORTSDATA_KEY = process.env.SPORTSDATA_KEY;
			request(
				{
					url: `https://api.sportsdata.io/v3/lol/scores/json/SeasonTeams/100000265?key=${SPORTSDATA_KEY}`,
					method: "GET",
				},
				(error, response, body) => {
					if (error) {
						console.error(error);
						return rej(error);
					}
					if (response.statusCode === 200) {
						res(JSON.parse(body));
					}
				}
			);
		});
	},
	getGamePlayerByGameKey: (gameKey) => {
		return new Promise((res, rej) => {
			const SPORTSDATA_KEY = process.env.SPORTSDATA_KEY;
			request(
				{
					url: `https://api.sportsdata.io/v3/lol/stats/json/BoxScore/${gameKey}?key=${SPORTSDATA_KEY}`,
					method: "GET",
				},
				(error, response, body) => {
					if (error) {
						console.error(error);
						return rej(error);
					}
					if (response.statusCode === 200) {
						res(JSON.parse(body));
					}
				}
			);
		});
	},
	getPlayersByTeamId: (teamId) => {
		return new Promise((res, rej) => {
			const SPORTSDATA_KEY = process.env.SPORTSDATA_KEY;
			request(
				{
					url: `https://api.sportsdata.io/v3/lol/scores/json/PlayersByTeam/${teamId}?key=${SPORTSDATA_KEY}`,
					method: "GET",
				},
				(error, response, body) => {
					if (error) {
						console.error(error);
						return rej(error);
					}
					if (response.statusCode === 200) {
						res(JSON.parse(body));
					}
				}
			);
		});
	},
	getScheduleByRoundId: () => {
		return new Promise((res, rej) => {
			const SPORTSDATA_KEY = process.env.SPORTSDATA_KEY;
			request(
				{
					url: `https://api.sportsdata.io/v3/lol/scores/json/Schedule/100001345?key=${SPORTSDATA_KEY}`,
					method: "GET",
				},
				(error, response, body) => {
					if (error) {
						console.error(error);
						return rej(error);
					}
					if (response.statusCode === 200) {
						res(JSON.parse(body));
					}
				}
			);
		});
	},
	createSchedule: (schedule, time) => {
		return new Promise(async (res, rej) => {
			const gameInfo = {};
			gameInfo.aTeamId = schedule.TeamAId;
			gameInfo.bTeamId = schedule.TeamBId;

			gameInfo.aTeamScore = schedule.TeamAScore == 3 ? 2 : schedule.TeamAScore;
			gameInfo.bTeamScore = schedule.TeamBScore == 3 ? 2 : schedule.TeamBScore;

			gameInfo.aTeamScore =
				gameInfo.aTeamScore == null ? 0 : gameInfo.aTeamScore;
			gameInfo.bTeamScore =
				gameInfo.bTeamScore == null ? 0 : gameInfo.bTeamScore;

			gameInfo.startTime = time;

			gameInfo.status =
				gameInfo.aTeamScore == 2 || gameInfo.bTeamScore == 2 ? 2 : -1;

			if (new Date() + 9 * 60 * 60 * 1000 > time) gameInfo.status = 0;

			gameInfo.gameId = schedule.GameId;

			await game.createSchedule(gameInfo);

			res("success createSchedule");
		});
	},
	compareSchedule: (dbSchedule, recentSchedule) => {
		const resultSchedule = {};

		resultSchedule.aTeamScore =
			recentSchedule.TeamAScore == 3 ? 2 : recentSchedule.TeamAScore;
		resultSchedule.bTeamScore =
			recentSchedule.TeamBScore == 3 ? 2 : recentSchedule.TeamBScore;

		resultSchedule.aTeamScore =
			resultSchedule.aTeamScore == null ? 0 : resultSchedule.aTeamScore;
		resultSchedule.bTeamScore =
			resultSchedule.bTeamScore == null ? 0 : resultSchedule.bTeamScore;

		if (
			(dbSchedule.finishedAt == null || dbSchedule.finishedAt == 0) &&
			recentSchedule.Status == "Final"
		) {
			resultSchedule.finishedAt = new Date();
		}

		if (
			recentSchedule.Status == "Scheduled" &&
			new Date() < dbSchedule.startTime
		) {
			resultSchedule.status = -1;
		} else if (
			recentSchedule.Status == "Final" &&
			(new Date() <
				new Date(Date.parse(dbSchedule.finishedAt) + 1000 * 60 * 3) ||
				dbSchedule.status == -1 ||
				dbSchedule.status == 0)
		) {
			resultSchedule.status = 1;
		} else if (recentSchedule.Status == "Final") {
			resultSchedule.status = 2;
		} else {
			resultSchedule.status = 0;
		}

		return resultSchedule;
	},
};

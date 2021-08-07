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
			gameInfo.a_team_id = schedule.TeamAId;
			gameInfo.b_team_id = schedule.TeamBId;

			gameInfo.a_team_score =
				schedule.TeamAScore == 3 ? 2 : schedule.TeamAScore;
			gameInfo.b_team_score =
				schedule.TeamBScore == 3 ? 2 : schedule.TeamBScore;

			gameInfo.a_team_score =
				gameInfo.a_team_score == null ? 0 : gameInfo.a_team_score;
			gameInfo.b_team_score =
				gameInfo.b_team_score == null ? 0 : gameInfo.b_team_score;

			gameInfo.startTime = time;

			gameInfo.status =
				gameInfo.a_team_score == 2 || gameInfo.b_team_score == 2 ? 1 : -1;
			if (new Date() + 9 * 60 * 60 * 1000 > time) gameInfo.status = 0;

			gameInfo.gameId = schedule.GameId;

			await game.createSchedule(gameInfo);

			res("success createSchedule");
		});
	},
	compareSchedule: (dbSchedule, recentSchedule) => {
		const resultSchedule = {};

		resultSchedule.a_team_score =
			recentSchedule.TeamAScore == 3 ? 2 : recentSchedule.TeamAScore;
		resultSchedule.b_team_score =
			recentSchedule.TeamBScore == 3 ? 2 : recentSchedule.TeamBScore;

		resultSchedule.a_team_score =
			resultSchedule.a_team_score == null ? 0 : resultSchedule.a_team_score;
		resultSchedule.b_team_score =
			resultSchedule.b_team_score == null ? 0 : resultSchedule.b_team_score;

		if (dbSchedule.finishedAt == null && recentSchedule.Status == "Final") {
			resultSchedule.finishedAt = new Date();
		}

		if (
			recentSchedule.Status == "Scheduled" &&
			new Date() < dbSchedule.startTime
		) {
			resultSchedule.status = -1;
		} else if (recentSchedule.Status == "Final") {
			resultSchedule.status = 1;
		} else {
			resultSchedule.status = 0;
		}

		return resultSchedule;
	},
};

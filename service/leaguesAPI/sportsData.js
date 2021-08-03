const request = require("request");

const playerRepo = require("../../dataAccess/player");
const teamRepo = require("../../dataAccess/team");

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
	updateTeamKey: (teamInfo) => {
		return new Promise(async (res, rej) => {
			await teamRepo.updateTeamKey(teamInfo);
			res("success create player data");
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
	updatePlayerKey: (player) => {
		return new Promise(async (res, rej) => {
			await playerRepo.updatePlayerKey(player.MatchName, player.PlayerId);
			res("success create player data");
		});
	},
};

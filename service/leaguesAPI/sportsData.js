const request = require("request");

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
};

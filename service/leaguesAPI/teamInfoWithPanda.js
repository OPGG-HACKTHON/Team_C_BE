const request = require("request");
const Team = require("../../dataAccess/team");

module.exports = {
	getTeamInfoWithPanda: () => {
		return new Promise((res, rej) => {
			const PANDA_KEY = process.env.PANDA_KEY;
			request(
				{
					url: `https://api.pandascore.co/lol/series/3659/teams?token=${PANDA_KEY}`,
					method: "GET",
				},
				(error, response, body) => {
					if (error) {
						console.error(error);
						return rej(error);
					}
					if (response.statusCode === 200) {
						const teamInfo = JSON.parse(body);
						const teamInfoArray = [];

						teamInfo.forEach((team) => {
							teamInfoArray.push({ name: team.acronym, icon: team.image_url });
						});
						res(teamInfoArray);
					}
				}
			);
		});
	},
	createTeamInfo: async (teamInfo) => {
		await Team.createTeamInfo(teamInfo);
	},
};

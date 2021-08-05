const request = require("request");
const cheerio = require("cheerio");
const team = require("../../dataAccess/team");

module.exports = {
	getTeamRankInfo: () => {
		return new Promise((res, rej) => {
			request(
				{
					url: "https://qwer.gg/leagues/LCK/2021/summer",
					method: "GET",
				},
				(error, response, body) => {
					if (error) {
						console.error(error);
						return rej(error);
					}
					if (response.statusCode === 200) {
						res(body);
					}
				}
			);
		});
	},
	parseTeamRankInfo: (body) => {
		const $ = cheerio.load(body);
		const rankTable = $(
			"tr",
			".Tabs__contents > .Ranks > table > tbody"
		).toArray();
		const teamRankInfo = [];
		for (let i = 0; i < 10; i++) {
			const temp = $(rankTable[i]).find("td").toArray();

			let name = $(temp[2]).text();
			const nameLen = name.length;
			name = name.substring(nameLen / 2);

			const rank = $(temp[0]).text();

			const total = $(temp[3]).text().split("승");
			const win = total[0] * 1;
			if (typeof total[1] == "undefined") {
				return new Error("수동 크롤링에 문제가 생겼습니다.");
			}

			const lose = total[1].split("패")[0] * 1;

			const rate = $(temp[4]).text().split("%")[0];

			teamRankInfo.push({ name, rank, win, lose, rate });
		}
		return teamRankInfo;
	},
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
	getIdfindByName: async (teamName) => {
		return await team.findTeamIdByName(teamName);
	},
};

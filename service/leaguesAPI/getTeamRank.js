const request = require("request");
const cheerio = require("cheerio");

const getTeamRankInfo = () => {
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
					const teamRankInfo = parseTeamRankInfo(body);
					res(teamRankInfo);
				}
			}
		);
	});
};

const parseTeamRankInfo = (body) => {
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
		const lose = total[1].split("패")[0] * 1;

		const rate = $(temp[4]).text().split("%")[0];

		teamRankInfo.push({ name, rank, win, lose, rate });
	}
	return teamRankInfo;
};

module.exports = { getTeamRankInfo };

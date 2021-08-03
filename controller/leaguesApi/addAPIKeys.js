const sportsDataService = require("../../service/leaguesAPI/sportsData");
const resUtil = require("../../util/resUtil");

const addAPIKeys = async (req, res) => {
	const seasonTeams = await sportsDataService.getSeasonTeams();

	await seasonTeams.forEach(async (element) => {
		let team = element.Team;

		// upate Team Key
		await sportsDataService.updateTeamKey(team);

		// get Player Detatil
		let players = await sportsDataService.getPlayersByTeamId(team.TeamId);

		// save player key
		await players.forEach(async (player) => {
			await sportsDataService.updatePlayerKey(player);
		});
	});

	res.json(resUtil.success(201, "API Key 세팅을 완료했습니다."));
};

module.exports = addAPIKeys;

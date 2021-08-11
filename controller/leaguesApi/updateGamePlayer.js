const sportsData = require("../../service/leaguesAPI/sportsData");
const game = require("../../dataAccess/game");
const resUtil = require("../../util/resUtil");
const gamePlayer = require("../../dataAccess/gamePlayer");

const updateGamePlayer = async (req, res) => {
	// 1. 최근 gameId 갖고오고
	const recentSchedule = await game.getRecentSchedule();
	const recentGameInDB = recentSchedule.dataValues;

	// 2. api로 해당 경기 선수 목록 뽑고
	const boxScore = await sportsData.getGamePlayerByGameKey(recentGameInDB.key);
	const gameMatches = boxScore[0].Matches;

	players = new Set();
	gameMatches.forEach((match) => {
		const playerMatches = match.PlayerMatches;

		playerMatches.forEach((player) => {
			players.add(player.PlayerId);
		});
	});

	// 3. 기존 gamePlayer에서 gameId로 다 갖고와서

	const existPlayer = await gamePlayer.getGamePlayerByGameId(recentGameInDB.id);

	existPlayer.forEach((player) => {
		if (players.has(player.dataValues.playerKey)) {
			players.delete(player.dataValues.playerKey);
		}
	});

	// 4. 2,3번 비교하면서 없는 애는 넣고 ㅇㅇ
	for (const player of players) {
		await gamePlayer.createGamePlayer(player, recentGameInDB.id);
	}
	// 끝

	res.json(resUtil.success(201, "현재 경기의 선수 업데이트를 완료했습니다."));
};

module.exports = updateGamePlayer;

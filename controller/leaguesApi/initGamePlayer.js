const sportsData = require("../../service/leaguesAPI/sportsData");
const game = require("../../dataAccess/game");
const resUtil = require("../../util/resUtil");
const gamePlayer = require("../../dataAccess/gamePlayer");

const initGamePlayer = async (req, res) => {
	// 1. 최근 gameId 갖고오고
	const games = await game.getAllGames();

	for (const game of games) {
		const recentGameInDB = game.dataValues;

		// 2. api로 해당 경기 선수 목록 뽑고
		const boxScore = await sportsData.getGamePlayerByGameKey(
			recentGameInDB.key
		);
		const gameMatches = boxScore[0].Matches;

		players = new Set();
		gameMatches.forEach((match) => {
			const playerMatches = match.PlayerMatches;

			playerMatches.forEach((player) => {
				players.add(player.PlayerId);
			});
		});

		// 3. 기존 gamePlayer에서 gameId로 다 갖고와서

		const existPlayer = await gamePlayer.getGamePlayerByGameId(
			recentGameInDB.id
		);

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
	}

	res.json(resUtil.success(201, "pog리스트 업데이트 완료."));
};

module.exports = initGamePlayer;

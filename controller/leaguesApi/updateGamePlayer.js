const sportsData = require("../../service/leaguesAPI/sportsData");
const game = require("../../dataAccess/game");
const resUtil = require("../../util/resUtil");
const { Set } = require("../../models");

const updateGamePlayer = async (req, res) => {
	// 1. 최근 gameId 갖고오고
	const recentSchedule = await game.getRecentSchedule();
	const recentGameInDB = recentSchedule.dataValues;
	// 2. api로 해당 경기 선수 목록 뽑고
	const boxScore = await sportsData.getGamePlayerByGameKey(recentGameInDB.key);
	const gameMatches = boxScore[0].Matches;

	const players = new Set();
	console.log(players);
	gameMatches.forEach((match) => {
		const playerMatches = match.PlayerMatches;

		playerMatches.forEach((player) => {
			players.add(player.PlayerId);
			console.log(player.PlayerId);
		});
	});

	// 3. 기존 gamePlayer에서 gameId로 다 갖고와서
	// 4. 2,3번 비교하면서 없는 애는 넣고 ㅇㅇ
	// 끝

	res.json(resUtil.success(201, "현재 경기의 선수 업데이트를 완료했습니다."));
};

module.exports = updateGamePlayer;

const adjustTime = require("../../util/adjustTime");
const teamRepo = require("../../dataAccess/team");

module.exports = {
	parseGameList: (monthSchedule) => {
		return new Promise(async (res, rej) => {
			const gameList = [];

			for (const game of monthSchedule) {
				const curGame = {};

				const data = game.dataValues;
				const a_team = await teamRepo.findTeamByKey(data.a_team_id);
				const b_team = await teamRepo.findTeamByKey(data.b_team_id);

				curGame.a_teamName = a_team.dataValues.name;
				curGame.b_teamName = b_team.dataValues.name;

				curGame.a_teamIcon = a_team.dataValues.icon;
				curGame.b_teamIcon = b_team.dataValues.icon;

				curGame.a_teamScore = data.a_team_score;
				curGame.b_teamScore = data.b_team_score;

				curGame.status = data.status;

				curGame.startTime = adjustTime(data.startTime);

				curGame.gameKey = data.key;

				gameList.push(curGame);
			}

			res(gameList);
		});
	},
};

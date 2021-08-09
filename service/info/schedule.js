const adjustTime = require("../../util/adjustTime");
const teamRepo = require("../../dataAccess/team");

module.exports = {
	parseGameList: (monthSchedule) => {
		return new Promise(async (res, rej) => {
			const gameList = [];

			for (const game of monthSchedule) {
				const curGame = {};

				const data = game.dataValues;
				const a_team = await teamRepo.findTeamByKey(data.aTeamId);
				const b_team = await teamRepo.findTeamByKey(data.bTeamId);

				curGame.id = data.id;

				curGame.aTeamName = a_team.dataValues.name;
				curGame.bTeamName = b_team.dataValues.name;

				curGame.aTeamIcon = a_team.dataValues.icon;
				curGame.bTeamIcon = b_team.dataValues.icon;

				curGame.aTeamScore = data.aTeamScore;
				curGame.bTeamScore = data.bTeamScore;

				curGame.status = data.status;

				curGame.startTime = adjustTime(data.startTime);

				gameList.push(curGame);
			}

			res(gameList);
		});
	},
};

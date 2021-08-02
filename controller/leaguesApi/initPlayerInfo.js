const { getPlayerInfo } = require("../../service/leaguesAPI/playerInfo");
const player = require("../../dataAccess/player");
const resUtil = require("../../util/resUtil");

const initTeamInfo = async (req, res) => {
	const playerInfo = await getPlayerInfo();
	await player.initPlayer(playerInfo);

	res.json(resUtil.success(201, "팀 정보 생성을 완료했습니다."));
};

module.exports = initTeamInfo;

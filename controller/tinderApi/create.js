const resUtil = require("../../util/resUtil");
const { createTinder } = require("../../dataAccess/tinder");
const {
  getTeamIdbyUserId,
  getReportedCountbyUserId,
} = require("../../dataAccess/user");

const create = async (req, res) => {
  const userId = req.userId;
  const teamId = await getTeamIdbyUserId(userId);
  const reportedCount = await getReportedCountbyUserId(userId);
  let body = { userId: userId, msg: req.body.msg, teamId: teamId };
  if (reportedCount < 5) {
    if (req.body.gameId) {
      body = {
        userId: userId,
        msg: req.body.msg,
        teamId: teamId,
        gameId: req.body.gameId,
      };
    }

    const result = await createTinder(body);

    if (result === "success") {
      res.json(resUtil.success(200, "틴더 생성 성공"));
    } else {
      res.json(resUtil.fail(400, "틴더 생성 실패"));
    }
  } else {
    res.json(resUtil.fail(401, "틴더 생성이 금지된 유저입니다."));
  }
};

module.exports = create;

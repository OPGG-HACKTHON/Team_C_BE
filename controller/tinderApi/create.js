const resUtil = require("../../util/resUtil");
const { createTinder } = require("../../dataAccess/tinder");
const { getTeamIdbyUserId } = require("../../dataAccess/user");

const create = async (req, res) => {
  const userId = req.userId;
  const teamId = await getTeamIdbyUserId(userId);
  if (req.body.gameId) {
    const body = {
      userId: userId,
      msg: req.body.msg,
      gameId: req.body.gameId,
      teamId: teamId,
    };

    const result = await createTinder(body);

    if (result === "success") {
      res.json(resUtil.success(200, "틴더 생성 성공"));
    } else {
      res.json(resUtil.fail(400, "틴더 생성 실패"));
    }
  } else {
    const body = {
      userId: userId,
      msg: req.body.msg,
      teamId: teamId,
      gameId: null,
    };

    const result = await createTinder(body);

    if (result === "success") {
      res.json(resUtil.success(200, "틴더 생성 성공"));
    } else {
      res.json(resUtil.fail(400, "틴더 생성 실패"));
    }
  }
};

module.exports = create;

const userSetting = require("../../dataAccess/user");
const resUtil = require("../../util/resUtil");

const updateTeamId = async (req, res) => {
  await userSetting.updateTeamId(req.user.uid, req.body.teamId);

  res.json(resUtil.success(201, "선호팀 업데이트 성공."));
};

module.exports = updateTeamId;

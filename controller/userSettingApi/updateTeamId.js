const userSetting = require("../../dataAccess/user");
const resUtil = require("../../util/resUtil");

const updateTeamId = async (req, res) => {
  const userId = req.userId;
  const teamId = req.body.teamId;
  await userSetting.updateTeamId(userId, teamId).then((response) => {
    if (response === "success") {
      res.json(resUtil.success(201, "선호팀 업데이트 성공."));
    } else {
      res.json(resUtil.fail(400, `${response.teamUpdateAvailableAt}`));
    }
  });
};

module.exports = updateTeamId;

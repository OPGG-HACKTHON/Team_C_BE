const userSetting = require("../../dataAccess/user");
const resUtil = require("../../util/resUtil");

const updateNickname = async (req, res) => {
  await userSetting.updateNickname(req.user.uid, req.body.nickname);

  res.json(resUtil.success(201, "닉네임업데이트 성공."));
};

module.exports = updateNickname;

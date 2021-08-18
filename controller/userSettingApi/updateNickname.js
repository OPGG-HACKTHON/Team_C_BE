const userSetting = require("../../dataAccess/user");
const resUtil = require("../../util/resUtil");

const updateNickname = async (req, res) => {
  const userId = req.userId;
  const newNickname = req.body.nickname;
  await userSetting.updateNickname(userId, newNickname);

  res.json(resUtil.success(201, "닉네임 업데이트 성공."));
};

module.exports = updateNickname;

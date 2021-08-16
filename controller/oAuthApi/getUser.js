const resUtil = require("../../util/resUtil");
const user = require("../../dataAccess/user");
const getUser = async (req, res) => {
  const userId = req.userId;
  const userData = await user.getUser(userId);
  if (userData.id) {
    return res.json(resUtil.success(200, userData));
  } else {
    return res.json(resUtil.success(400, "read user error"));
  }
};

module.exports = getUser;

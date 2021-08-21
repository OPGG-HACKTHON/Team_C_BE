const resUtil = require("../../util/resUtil");
const signoutMethod = require("../../service/oAuthAPI/signout");
const signout = async (req, res) => {
  const userId = req.userId;

  const { deleteResult } = await signoutMethod.signout(userId);

  if (deleteResult === "success") {
    return res.json(resUtil.success(200, "user deleted"));
  } else {
    return res.json(resUtil.fail(400, "failed to delete user"));
  }
};

module.exports = signout;

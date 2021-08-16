const resUtil = require("../../util/resUtil");
const signoutMethod = require("../../service/oAuthAPI/signout");
const signout = (req, res) => {
  const userId = req.userId;
  signoutMethod.signout(userId);
};

module.exports = signout;

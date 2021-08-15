const resUtil = require("../../util/resUtil");
const signoutMethod = require("../../service/oAuthAPI/signout");
const signout = (req, res) => {
  signoutMethod.signout(req, res);
};

module.exports = signout;

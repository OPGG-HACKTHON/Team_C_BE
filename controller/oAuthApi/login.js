const resUtil = require("../../util/resUtil");
const loginMethod = require("../../service/oAuthAPI/login");
const login = (req, res) => {
  if (req.body.id) {
    loginMethod.login(req, res);
  } else {
    res.json(resUtil.fail(400, "missing id"));
  }
};

module.exports = login;

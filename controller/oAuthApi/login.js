const resUtil = require("../../util/resUtil");
const loginMethod = require("../../service/oAuthAPI/login");
const login = (req, res) => {
  loginMethod.login(req, res);
};

module.exports = login;

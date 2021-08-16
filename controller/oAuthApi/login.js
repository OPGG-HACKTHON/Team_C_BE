const resUtil = require("../../util/resUtil");
const loginMethod = require("../../service/oAuthAPI/login");
const login = (req, res) => {
  const { id } = req.body;
  if (id) {
    loginMethod.login(id);
  } else {
    res.json(resUtil.fail(400, "missing id"));
  }
};

module.exports = login;

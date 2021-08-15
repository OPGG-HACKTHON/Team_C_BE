const resUtil = require("../../util/resUtil");
const signupMethod = require("../../service/oAuthAPI/signup");
const signup = (req, res) => {
  if (req.body.id && req.body.nickname && req.body.provider) {
    signupMethod.signup(req, res);
  } else {
    res.json(resUtil.fail(400, "missing requirements"));
  }
};

module.exports = signup;

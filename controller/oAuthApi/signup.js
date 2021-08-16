const resUtil = require("../../util/resUtil");
const signupMethod = require("../../service/oAuthAPI/signup");
const signup = (req, res) => {
  const body = req.body;
  const { id, nickname, provider } = body;

  if (id && nickname && provider) {
    signupMethod.signup(body);
  } else {
    res.json(resUtil.fail(400, "missing requirements"));
  }
};

module.exports = signup;

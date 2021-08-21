const resUtil = require("../../util/resUtil");
const signupMethod = require("../../service/oAuthAPI/signup");
const signup = async (req, res) => {
  const body = req.body;
  const { id, nickname, provider } = body;

  if (id && nickname && provider) {
    const { accesstoken, refreshtoken } = await signupMethod.signup(body);

    res.setHeader("accesstoken", accesstoken);
    res.setHeader("refreshtoken", refreshtoken);
    return res.json(resUtil.success(200, "회원가입 성공"));
  } else {
    return res.json(resUtil.fail(400, "missing requirements"));
  }
};

module.exports = signup;

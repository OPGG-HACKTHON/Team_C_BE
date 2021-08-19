const resUtil = require("../../util/resUtil");
const loginMethod = require("../../service/oAuthAPI/login");
const user = require("../../dataAccess/user");
const login = async (req, res) => {
  const { id } = req.body;

  if (id) {
    const userId = await user.checkNewUser(id);

    if (userId === "notRegistered") {
      return res.json(resUtil.fail(401, "회원가입이 필요한 유저입니다."));
    }

    const { accesstoken, refreshtoken } = await loginMethod.getToken(userId);

    res.setHeader("accesstoken", accesstoken);
    res.setHeader("refreshtoken", refreshtoken);

    return res.json(resUtil.success(200, "로그인 성공"));
  } else {
    res.json(resUtil.fail(400, "missing id"));
  }
};

module.exports = login;

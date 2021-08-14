const user = require("../../dataAccess/user");
const jwt = require("jsonwebtoken");
const { generateRefreshToken } = require("../../dataAccess/refreshToken");
const resUtil = require("../../util/resUtil");

module.exports = {
  async login(req, res) {
    let uid = req.body.id; // 소셜 ID
    await user.checkNewUser(uid).then((response) => {
      if (response === "notRegistered") {
        return res.json(resUtil.fail(401, "회원가입이 필요한 유저입니다."));
      } else {
        let userId = response; // response = user ID

        const accesstoken = jwt.sign({ userId }, process.env.JWT_SECRET, {
          expiresIn: "1h",
          issuer: "milestone",
        });

        generateRefreshToken(userId).then((response) => {
          let headers = { accesstoken: accesstoken, refreshtoken: response };

          res.setHeader("accesstoken", accesstoken);
          res.setHeader("refreshtoken", response);

          return res.json(resUtil.success(200, "로그인 성공"));
        });
      }
    });
  },
};

const user = require("../../dataAccess/user");
const jwt = require("jsonwebtoken");
const { generateRefreshToken } = require("../../dataAccess/refreshToken");

const resUtil = require("../../util/resUtil");
module.exports = {
  async signup(body) {
    let userData = {
      uid: body.id, //소셜 id값
      nickname: body.nickname,
      teamId: body.teamId,
      provider: body.provider,
    };

    await user.createUser(userData).then((response) => {
      let userId = response; //response = user ID

      const accesstoken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1h",
        issuer: "milestone",
      });

      generateRefreshToken(userId).then((response) => {
        res.setHeader("accesstoken", accesstoken);
        res.setHeader("refreshtoken", response);

        return res.json(resUtil.success(200, "회원가입 성공"));
      });
    });
  },
};

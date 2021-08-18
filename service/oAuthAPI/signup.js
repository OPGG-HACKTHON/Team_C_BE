const user = require("../../dataAccess/user");
const jwt = require("jsonwebtoken");
const { generateRefreshToken } = require("../../dataAccess/refreshToken");

module.exports = {
  async signup(body) {
    let userData = {
      uid: body.id, //소셜 id값
      nickname: body.nickname,
      teamId: body.teamId,
      provider: body.provider,
    };

    const userId = await user.createUser(userData);

    const accesstoken = await jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
      issuer: "milestone",
    });

    const refreshtoken = await generateRefreshToken(userId);

    return { accesstoken, refreshtoken };
  },
};

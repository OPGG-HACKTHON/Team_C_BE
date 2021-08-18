const jwt = require("jsonwebtoken");
const { generateRefreshToken } = require("../../dataAccess/refreshToken");

module.exports = {
  async getToken(userId) {
    const accesstoken = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
      issuer: "milestone",
    });

    const refreshtoken = await generateRefreshToken(userId);

    return { accesstoken, refreshtoken };
  },
};

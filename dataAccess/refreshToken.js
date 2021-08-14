const { RefreshToken } = require("../models/index");
const jwt = require("jsonwebtoken");
module.exports = {
  generateRefreshToken: (userId) => {
    return new Promise((res, rej) => {
      const refreshtoken = jwt.sign({}, process.env.JWT_SECRET, {
        expiresIn: "30d",
        issuer: "milestone",
      });

      RefreshToken.create({
        token: refreshtoken,
        userId: userId,
      })
        .then((refreshtoken) => {
          res(refreshtoken.dataValues.token);
        })
        .catch((err) => {
          rej(err);
        });
    });
  },

  getUserIdByRefreshToken: (token) => {
    return new Promise((res, rej) => {
      RefreshToken.findOne({ where: { token: token } }).then((refreshtoken) => {
        res(refreshtoken.dataValues.userId);
      });
    });
  },
};

const { User } = require("../models/index");
const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      if (e.name === "TokenExpiredError") {
        return null;
      }
    }
  },
};

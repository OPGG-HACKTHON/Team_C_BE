const user = require("../../dataAccess/user");

module.exports = {
  async signin(req, res, next) {
    let userData = {
      uid: req.body.id, //소셜 id값
      nickname: req.body.nickname,
      teamId: req.body.teamId,
      provider: req.body.provider,
    };

    user.createUser(userData).then((response) => {
      if (response === "success init User") {
        return "success init User";
      } else {
        return "fail init User";
      }
    });
  },
};

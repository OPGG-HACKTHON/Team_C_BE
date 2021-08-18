const { Tinder } = require("../models/index");
const { User } = require("../models/index");

module.exports = {
  createTinder: (body) => {
    return new Promise((res, rej) => {
      Tinder.create({
        message: body.msg,
        userId: body.userId,
        teamId: body.teamId,
        gameId: body.gameId,
      })
        .then(async (tinder) => {
          console.log("생성된틴더", tinder);

          res("success");
        })
        .catch((err) => {
          rej(err);
        });
    });
  },
};

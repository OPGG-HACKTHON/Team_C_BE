const { Tinder } = require("../models/index");
const oneDay = require("../util/oneDay");
const moment = require("moment");
const { Op } = require("sequelize");
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
          res("success");
        })
        .catch((err) => {
          rej(err);
        });
    });
  },

  getHistoryById: (userId) => {
    return new Promise((res, rej) => {
      Tinder.findAll({
        where: {
          [Op.and]: [
            { userId: userId },
            { createdAt: { [Op.lt]: moment() } },
            { createdAt: { [Op.gte]: moment().subtract(1, "days") } },
          ],
        },

        order: [["id", "DESC"]],
      })
        .then(async (tinders) => {
          let list = [];
          await tinders.map((tinder) => {
            const data = tinder.dataValues;

            list.push(data);
          });

          res({ list });
        })
        .catch((err) => {
          rej(err);
        });
    });
  },
};

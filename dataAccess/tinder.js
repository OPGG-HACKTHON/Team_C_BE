const { Tinder } = require("../models/index");
const { User } = require("../models/index");
const { Team } = require("../models/index");
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

  getWriterById: (id) => {
    return new Promise((res, rej) => {
      Tinder.findOne({ where: { id: id } })
        .then((tinder) => {
          res(tinder.dataValues.userId);
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
  getAllTinderByGameId: (gameId) => {
    return new Promise(async (res, rej) => {
      const result = await Tinder.findAll({
        where: { gameId: gameId },
      });
      res(result);
    });
  },
  getTinder: (userId, filter) => {
    return new Promise((res, rej) => {
      Tinder.findAll({
        // include: [{ model: User, where: { teamId: { [Op.notIn]: filter } } }],
        include: [
          { model: User, attributes: ["id", "nickname"] },
          { model: Team, attributes: ["id", "icon", "name"] },
        ],
        where: {
          [Op.and]: [
            { userId: { [Op.notIn]: [userId] } },
            { createdAt: { [Op.gte]: moment().subtract(1, "minute") } },
            { teamId: { [Op.notIn]: filter } },
          ],
        },
        attributes: [
          "id",
          "message",
          "like",
          "superlike",
          "dislike",
          "pass",
          "createdAt",
        ],
      })
        .then(async (tinders) => {
          let list = [];
          await tinders.map((tinder) => {
            const data = tinder.dataValues;
            list.push(data);
          });
          res(list);
        })
        .catch((err) => {
          rej(err);
        });
    });
  },
};

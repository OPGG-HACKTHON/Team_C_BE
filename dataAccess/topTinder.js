const { TopTinder, User, Tinder, Team } = require("../models/index");

module.exports = {
  createTopTinder: (tinder, rank) => {
    return new Promise((res, rej) => {
      TopTinder.create({
        rank: rank,
        tinderId: tinder.id,
      })
        .then(async (tinder) => {
          res("success");
        })
        .catch((err) => {
          rej(err);
        });
    });
  },

  getHOF: (userId) => {
    return new Promise((res, rej) => {
      TopTinder.findAll({
        include: [
          {
            model: Tinder,
            attributes: [
              "id",
              "message",
              "gameId",
              "like",
              "superlike",
              "dislike",
              "pass",
              "createdAt",
            ],
            include: [
              {
                model: User,
                attributes: ["id", "nickname"],
              },
            ],
            where: { userId: userId },
          },
        ],

        order: [
          ["rank", "ASC"],
          ["id", "DESC"],
        ],
      })
        .then(async (HOFs) => {
          let list = [];

          await HOFs.map((HOF) => {
            const data = HOF.dataValues;

            list.push(data);
          });

          res(list);
        })
        .catch((err) => {
          rej(err);
        });
    });
  },

  getTopTinder: (gameId) => {
    return new Promise((res, rej) => {
      TopTinder.findAll({
        include: [
          {
            model: Tinder,
            attributes: [
              "id",
              "message",
              "gameId",
              "like",
              "superlike",
              "dislike",
              "pass",
              "createdAt",
            ],

            include: [
              {
                model: User,
                attributes: ["id", "nickname"],
              },

              {
                model: Team,
                attributes: ["id", "icon", "name"],
              },
            ],

            where: {
              gameId: gameId,
            },
          },
          //   {
          //     model: Tinder,

          //   },
        ],
        order: [["rank", "ASC"]],
      })
        .then(async (topTinders) => {
          let list = [];
          await topTinders.map((topTinder) => {
            const data = topTinder.dataValues;

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

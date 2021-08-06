const { User } = require("../models/index");

module.exports = {
  checkNewUser: (uid) => {
    return new Promise((res, rej) => {
      User.findOne({
        where: { uid: uid },
      })
        .then((user) => {
          if (user === null) {
            res("notRegistered");
          } else {
            res("registered");
          }
        })
        .catch((err) => {
          rej(err);
        });
    });
  },

  createUser: (user) => {
    return new Promise((res, rej) => {
      User.create({
        uid: user.uid,
        provider: user.provider,
      })
        .then(() => {
          res("success init User");
        })
        .catch((err) => {
          rej(err);
        });
    });
  },

  updateNickname: (uid, newNickname) => {
    return new Promise((res, rej) => {
      User.update(
        { nickname: newNickname, refreshedAt: Date.now() },
        {
          where: { uid: uid },
        }
      )
        .then(() => {
          res("닉네임변경성공");
        })
        .catch((err) => {
          rej(err);
        });
    });
  },

  updateTeamId: (user, teamId) => {
    return new Promise((res, rej) => {
      if (user.teamUpdatedAt === null) {
        User.update({ teamId: teamId, teamUpdateAt: Date.now() })
          .then(() => {
            res("success");
          })
          .catch((err) => {
            rej(err);
          });
      } else if (
        Date.parse(user.teamUpdatedAt) + 1000 * 60 * 60 * 24 * 30 <
        Date.now()
      ) {
        User.update(
          { teamId: teamId, teamUpdatedAt: Date.now() },
          {
            where: { uid: user.uid },
          }
        )
          .then(() => {
            res("success");
          })
          .catch((err) => {
            rej(err);
          });
      } else {
        res({
          teamUpdatedAt: user.teamUpdatedAt,
        });
      }
    });
  },
};

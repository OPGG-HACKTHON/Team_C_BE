const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const userMethod = require("../../dataAccess/user");
const { User } = require("../../models/index");
module.exports = {
  kakaoSerializer: () => {
    passport.serializeUser((uid, done) => {
      console.log("passport session save:", uid);
      done(null, uid);
    });
  },

  kakaoDeserializer: () => {
    passport.deserializeUser((uid, done) => {
      console.log("passport session get uid:", uid);

      User.findOne({
        where: { uid: uid },
      }).then((user) => {
        done(null, user.dataValues);
      });
    });
  },
  kakaoUse: () => {
    passport.use(
      "login-kakao",
      new KakaoStrategy(
        {
          clientID: process.env.KAKAO_CLIENTID,
          callbackURL: process.env.KAKAO_CALLBACKURL,
        },
        (accessToken, refreshToken, profile, done) => {
          userMethod.checkNewUser(profile.id).then((response) => {
            if (response === "registered") {
              return done(null, profile.id);
            } else if (response === "notRegistered") {
              console.log("신규유저에용");
              userMethod.createUser({
                uid: profile.id,
                provider: "kakao",
              });

              return done(null, profile.id);
            }
          });
        }
      )
    );
  },
};

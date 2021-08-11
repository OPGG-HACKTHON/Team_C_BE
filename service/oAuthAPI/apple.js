const passport = require("passport");
const AppleStrategy = require("passport-apple").Strategy;
const userMethod = require("../../dataAccess/user");
const { User } = require("../../models/index");
module.exports = {
  appleSerializer: () => {
    passport.serializeUser((decodedIdToken, done) => {
      console.log("passport session save:", decodedIdToken);
      done(null, decodedIdToken.sub);
    });
  },

  appleDeserializer: () => {
    passport.deserializeUser((sub, done) => {
      console.log("passport session get uid:", sub);

      //   User.findOne({
      //     where: { uid: uid },
      //   }).then((user) => {
      //     done(null, user.dataValues);
      //   });
    });
  },
  appleUse: () => {
    passport.use(
      "login-apple",
      new AppleStrategy(
        {
          clientID: process.env.APPLE_CLIENTID,
          teamId: process.env.APPLE_TEAMID,
          callbackURL: process.env.APPLE_CALLBACKURL,
          keyID: process.env.APPLE_KEYID,
          privateKeyString: process.env.APPLE_KEY,
        },
        (req, accessToken, refreshToken, decodedIdToken, profile, done) => {
          done(null, decodedIdToken);
          //   userMethod.checkNewUser(profile.id).then((response) => {
          //     if (response === "registered") {
          //       return done(null, profile.id);
          //     } else if (response === "notRegistered") {
          //       console.log("신규유저에용");
          //       userMethod.createUser({
          //         uid: profile.id,
          //         provider: "kakao",
          //       });

          //       return done(null, profile.id);
          //     }
          //   });
        }
      )
    );
  },
};

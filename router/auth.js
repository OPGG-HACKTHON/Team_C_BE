const express = require("express");
const router = express.Router();
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const User = require("../models/user");
const kakaoCredentials = require("../config/kakao.json");

passport.serializeUser((user, done) => {
  console.log("passport session save:", user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("passport session get id:", id);
  done(null, id);
});
passport.use(
  "login-kakao",
  new KakaoStrategy(
    kakaoCredentials,
    (accessToken, refreshToken, profile, done) => {
      console.log(`accessToken : ${accessToken}`);
      console.log(`사용자 profile: ${JSON.stringify(profile._json)}`);
      const NewUserId = "kakao:" + profile.id;

      const sql = "select * from user where username = ?";

      let email = profile.kakao_account.email;

      let user = {
        profile: profile._json,
        accessToken: accessToken,
        // profile.kakao_account.email = redboy1111@naver.com
        email: profile.kakao_account.email,
      };
      return done(null, user);
    }
  )
);

//localhost:5000/auth/kakao로 들어오면 (get으로 들어오면) passport.authenticate를 실행( 임의로 login-kakao로 명명)
router.get("/kakao", passport.authenticate("login-kakao"), function (req, res) {
  res.send(`id: ${req.user.profile.id} / accessToken: ${req.user.accessToken}`);
});

router.get(
  "/kakao/callback",
  passport.authenticate("login-kakao", {
    successRedirect: "/",
    failureRedirect: "/api/auth/fail",
  })
);

router.get("/fail", (req, res) => {
  res.send("wrong access, please check username and password again");
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;

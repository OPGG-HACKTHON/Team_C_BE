const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../util/wrapAsync");
const kakaoService = require("../service/oAuthAPI/kakao");

const kakaoAuthenticate = require("../controller/oAuthApi/kakaoAuthenticate");
const getUser = require("../controller/oAuthApi/getUser");
kakaoService.kakaoSerializer();
kakaoService.kakaoDeserializer();
kakaoService.kakaoUse();

//localhost:5000/auth/kakao로 들어오면 (get으로 들어오면) passport.authenticate를 실행( 임의로 login-kakao로 명명)
router.get(
  "/kakao",
  passport.authenticate("login-kakao"),
  wrapAsync(kakaoAuthenticate)
);

router.get(
  "/kakao/callback",
  passport.authenticate("login-kakao", {
    successRedirect: "http://localhost:3000/success",
    failureRedirect: "/auth/kakao/fail",
  })
);

router.get(
  "/getUser",

  wrapAsync(getUser)
);

module.exports = router;

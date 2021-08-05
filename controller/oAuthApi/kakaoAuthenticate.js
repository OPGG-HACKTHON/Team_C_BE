const resUtil = require("../../util/resUtil");

const kakaoAuthenticate = (req, res) => {
  res.json(resUtil.success(201, "카카오 세션 생성 완료"));
};

module.exports = kakaoAuthenticate;

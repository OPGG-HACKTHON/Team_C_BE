const resUtil = require("../../util/resUtil");

const appleAuthenticate = (req, res) => {
  res.json(resUtil.success(201, "애플 세션 생성 완료"));
};

module.exports = appleAuthenticate;

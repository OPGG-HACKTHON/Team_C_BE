const resUtil = require("../../util/resUtil");

const getUser = (req, res) => {
  res.json(resUtil.success(201, { user: req.user }));
};

module.exports = getUser;

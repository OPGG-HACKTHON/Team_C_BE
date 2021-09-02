const resUtil = require("../../util/resUtil");
const tinderMethod = require("../../dataAccess/tinder");
const getTotalTinder = async (req, res) => {
  const userId = req.userId;

  const result = await tinderMethod.getTotalTinder(userId);
  return res.json(resUtil.success(200, result));
};

module.exports = getTotalTinder;

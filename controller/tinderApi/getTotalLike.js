const resUtil = require("../../util/resUtil");
const tinderMethod = require("../../dataAccess/tinder");
const getTotalLike = async (req, res) => {
  const userId = req.userId;

  const result = await tinderMethod.getTotalLike(userId);
  return res.json(resUtil.success(200, result));
};

module.exports = getTotalLike;

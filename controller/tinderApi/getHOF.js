const resUtil = require("../../util/resUtil");
const topTinderMethod = require("../../dataAccess/topTinder");
const getHOF = async (req, res) => {
  const userId = req.userId;

  const result = await topTinderMethod.getHOF(userId);
  return res.json(resUtil.success(200, result));
};

module.exports = getHOF;

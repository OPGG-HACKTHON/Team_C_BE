const resUtil = require("../../util/resUtil");
const topTinderMethod = require("../../dataAccess/topTinder");
const getTopTinder = async (req, res) => {
  const { gameId } = req.body;

  const result = await topTinderMethod.getTopTinder(gameId);
  return res.json(resUtil.success(200, result));
};

module.exports = getTopTinder;

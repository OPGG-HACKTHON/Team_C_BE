const resUtil = require("../../util/resUtil");
const { getHistoryById } = require("../../dataAccess/tinder");
const getHistory = async (req, res) => {
  const userId = req.userId;

  const { list } = await getHistoryById(userId);

  if (list.length) {
    res.json(resUtil.success(200, list));
  } else if (list.length === 0) {
    res.json(resUtil.fail(401, "하루동안 히스토리가 없습니다."));
  } else {
    res.json(resUtil.fail(400, "히스토리 조회실패"));
  }
};

module.exports = getHistory;

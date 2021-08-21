const resUtil = require("../../util/resUtil");
const { getWriterById } = require("../../dataAccess/tinder");
const reportMethod = require("../../dataAccess/report");
const createReport = async (req, res) => {
  const { tinderId, reportMsg } = req.body;
  const reportFrom = req.userId;

  if (tinderId && reportMsg) {
    const reportTo = await getWriterById(tinderId);

    const body = {
      reportFrom: reportFrom,
      reportTo: reportTo,
      tinderId: tinderId,
      reportMsg: reportMsg,
    };

    const reportResult = await reportMethod.createReport(body);

    if (reportResult === "success") {
      res.json(resUtil.success(200, "리폿 성공"));
    } else {
      return res.json(resUtil.fail(400, "리폿 실패"));
    }
  } else {
    return res.json(resUtil.fail(401, "틴더id나 리폿메시지가 부족합니다."));
  }
};

module.exports = createReport;

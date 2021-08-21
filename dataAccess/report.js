const { Report } = require("../models/index");
module.exports = {
  createReport: (body) => {
    return new Promise((res, rej) => {
      Report.create({
        reportFrom: body.reportFrom,
        reportTo: body.reportTo,
        tinderId: body.tinderId,
        reportMsg: body.reportMsg,
      })
        .then(() => {
          res("success");
        })
        .catch((err) => {
          rej(err);
        });
    });
  },
};

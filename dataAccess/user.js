const { User } = require("../models/index");

module.exports = {
  create: (name, age) => {
    return new Promise((resolve, reject) => {
      User.create({
        name,
        age,
      })
        .then(() => {
          resolve("good");
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config/config");
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 테이블 불러오기
db.Team = require("./team")(sequelize, Sequelize);
db.Player = require("./player")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
db.Team.hasMany(db.Player, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.Team.hasMany(db.User, {
  onUpdate: "SET NULL",
  onDelete: "SET NULL",
});
db.Player.belongsTo(db.Team, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = db;

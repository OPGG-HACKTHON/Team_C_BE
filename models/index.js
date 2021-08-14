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
db.Game = require("./game")(sequelize, Sequelize, db.Team);
db.User = require("./user")(sequelize, Sequelize);
db.POG = require("./POG")(sequelize, Sequelize);
db.Tinder = require("./tinder")(sequelize, Sequelize);
db.TopTinder = require("./topTinder")(sequelize, Sequelize);
db.RefreshToken = require("./refreshToken")(sequelize, Sequelize);
db.GamePlayer = require("./gamePlayer")(sequelize, Sequelize, db.Player);

db.User.hasMany(db.Tinder, {
  onUpdate: "SET NULL",
  onDelete: "SET NULL",
});
db.Tinder.belongsTo(db.User);

db.Game.hasMany(db.Tinder, {
  onUpdate: "SET NULL",
  onDelete: "SET NULL",
});
db.Tinder.belongsTo(db.Game);

db.Report = require("./report")(sequelize, Sequelize, db.User, db.Tinder);

db.Team.hasMany(db.Player, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.Player.belongsTo(db.Team);

db.Team.hasMany(db.User, {
  onUpdate: "SET NULL",
  onDelete: "SET NULL",
});
db.User.belongsTo(db.Team);

db.User.hasOne(db.RefreshToken, {
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
db.RefreshToken.belongsTo(db.User);

db.Game.hasMany(db.GamePlayer, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.GamePlayer.belongsTo(db.Game);

db.GamePlayer.hasMany(db.POG, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.POG.belongsTo(db.GamePlayer);

db.User.hasMany(db.POG, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.POG.belongsTo(db.User);

db.Tinder.hasMany(db.TopTinder, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.TopTinder.belongsTo(db.Tinder);

module.exports = db;

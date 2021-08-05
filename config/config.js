module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: "mysql",
  timezone: "Asia/Seoul",
};

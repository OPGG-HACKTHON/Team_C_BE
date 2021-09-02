const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");

dotenv.config();

const { stream } = require("./config/winston");
const { fail } = require("./util/resUtil");

const leaguesAPI = require("./router/leaguesAPI.router");

const auth = require("./router/auth");
const userSetting = require("./router/userSetting");
const infoRouter = require("./router/info.router");
const pogRouter = require("./router/pog.router");
const tinderRouter = require("./router/tinder.router");
const app = express();

if (process.env.NODE_ENV == "dev") {
  app.use(logger("dev"));
} else if (process.env.NODE_ENV == "production") {
  app.use(logger("combined", { stream }));
}

const { sequelize } = require("./models/index");

sequelize
  .sync({ force: false })
  .then(() => {})
  .catch((err) => {
    console.error(err);
  });

app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    exposedHeaders: "accesstoken, refreshtoken",
    origin: true,
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/leaguesApi", leaguesAPI);

app.use("/auth", auth);
app.use("/userSetting", userSetting);
app.use("/info", infoRouter);
app.use("/pog", pogRouter);
app.use("/tinder", tinderRouter);

app.use(function (req, res, next) {
  res.status(404).send(fail(404, "요청한 API 주소가 존재하지 않습니다."));
});

const server = http.createServer(app);

if (process.env.NODE_ENV != "test") {
  server.listen(process.env.PORT, () => {
    console.log("Server listening PORT : " + process.env.PORT);
  });
}

module.exports = { server };

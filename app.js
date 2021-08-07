const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
// const FileStore = require("session-file-store")(session);
const passport = require("passport");

dotenv.config();

const { fail } = require("./util/resUtil");

const leaguesAPI = require("./router/leaguesAPI.router");
const testAPI = require("./router/testAPI.router");
const auth = require("./router/auth");
const userSetting = require("./router/userSetting");
const infoRouter = require("./router/info.router");

const app = express();

app.use(logger("dev"));

const { sequelize } = require("./models/index");

sequelize
	.sync({ force: false })
	.then(() => {
		console.log("Connect DB");
	})
	.catch((err) => {
		console.error(err);
	});

app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// 세션
app.use(
	session({
		secret: process.env.DB_SESSIONSECRET,
		resave: false,
		saveUninitialized: true,
		store: new MySQLStore({
			host: process.env.DB_HOST,
			port: "3306",
			user: process.env.DB_USERNAME,
			password: process.env.DB_PWD,
			database: process.env.DB_DATABASE,
		}),
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/leaguesApi", leaguesAPI);
app.use("/testAPI", testAPI);
app.use("/auth", auth);
app.use("/userSetting", userSetting);
app.use("/info", infoRouter);

app.use(function (req, res, next) {
	res.status(404).send(fail(404, "요청한 API 주소가 존재하지 않습니다."));
});

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
	console.log("Server listening PORT : " + process.env.PORT);
});

module.exports = app;

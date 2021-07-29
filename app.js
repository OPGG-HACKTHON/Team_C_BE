const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");

dotenv.config();

const router = require("./router/router");
const leaguesApi = require("./router/leaguesApi");

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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/db", router);
app.use("/leaguesApi", leaguesApi);

const server = http.createServer(app);

app.use(function (req, res, next) {
	next(createError(404));
});

app.use(function (err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	res.status(err.status || 500);
	res.render("error");
});

server.listen(process.env.PORT, () => {
	console.log("Server listening PORT : " + process.env.PORT);
});

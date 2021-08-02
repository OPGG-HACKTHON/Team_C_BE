const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");

dotenv.config();

const { fail } = require("./util/resUtil");

const leaguesAPI = require("./router/leaguesAPI.router");

const app = express();

app.use(logger("dev"));

const { sequelize } = require("./models/index");
sequelize
	.sync({ force: true })
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

app.use("/leaguesApi", leaguesAPI);

app.use(function (req, res, next) {
	res.status(404).send(fail(404, "요청한 API 주소가 존재하지 않습니다."));
});

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
	console.log("Server listening PORT : " + process.env.PORT);
});

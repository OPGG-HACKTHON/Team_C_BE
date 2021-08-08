const fs = require("fs");
const winston = require("winston");

const logDir = __dirname + "/../logs";

if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const infoTransport = new winston.transports.File({
	filename: "info.log",
	dirname: logDir,
	level: "info",
});

const errorTransport = new winston.transports.File({
	filename: "error.log",
	dirname: logDir,
	level: "error",
});

const logger = winston.createLogger({
	transports: [infoTransport, errorTransport],
});

const stream = {
	write: (message) => {
		logger.info(message);
	},
};

module.exports = { logger, stream };

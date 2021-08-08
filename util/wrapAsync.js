const { fail } = require("../util/resUtil");
const { logger } = require("../config/winston");

module.exports = function wrapAsync(fn) {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (err) {
			if (process.env.NODE_ENV == "production") {
				const errObj = {
					req: {
						headers: req.headers,
						query: req.query,
						body: req.body,
						route: req.route,
					},
					error: {
						message: err.message,
						stack: err.stack,
						status: err.status,
					},
					user: req.user,
				};
				logger.error(errObj);
			}

			return res.status(500).json(fail(500, err.message));
		}
	};
};

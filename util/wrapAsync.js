const { fail } = require("../util/resUtil");

module.exports = function wrapAsync(fn) {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (err) {
			return res.status(500).json(fail(500, err.message));
		}
	};
};

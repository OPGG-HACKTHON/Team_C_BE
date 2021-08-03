const { fail } = require("../util/resUtil");

module.exports = function wrapAsync(fn) {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (err) {
			if (res.headersSent) {
				return;
			}
			console.error(err);
			res
				.status(500)
				.json(fail(500, "서버 내 예상치 못한 에러가 발생했습니다."));
		}
	};
};

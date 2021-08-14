const { verifyToken } = require("./jwt");
const {
	generateRefreshToken,
	getUserIdByRefreshToken,
} = require("../dataAccess/refreshToken");
const jwt = require("jsonwebtoken");
module.exports = {
	async checkTokens(req, res, next) {
		if (req.headers.accesstoken === undefined)
			throw Error("API사용권한이없습니다.");

		const accesstoken = verifyToken(req.headers.accesstoken);
		const refreshtoken = verifyToken(req.headers.refreshtoken);

		if (accesstoken === null) {
			if (refreshtoken === null)
				//case1: acc, ref 모두 만료

				throw Error("API 사용 권한이 없습니다.");
			else {
				//case2 : acc는 만료, ref는 유효
				// DB를 조회해서 payload에 담을 값을 가져오는 로직

				const userId = await getUserIdByRefreshToken(req.headers.refreshtoken);
				const newaccesstoken = jwt.sign({ userId }, process.env.JWT_SECRET, {
					expiresIn: "1h",
					issuer: "milestone",
				});
				res.setHeader("accesstoken", newaccesstoken);
				res.setHeader("refreshToken", req.headers.refreshtoken);
				req.headers.accesstoken = newaccesstoken;
			}
		} else {
			if (refreshtoken === null) {
				//case3: acc 유효 , ref는 만료됨
				generateRefreshToken(accesstoken.id).then((newRefreshtoken) => {
					res.setHeader("refreshtoken", newRefreshtoken);
					res.setHeader("accesstoken", req.headers.accesstoken);
					req.headers.refreshtoken = newRefreshtoken;
				});
			} else {
				// case4: acc, ref 모두 유효한 경우
			}
		}
		const { userId } = jwt.verify(
			req.headers.accesstoken,
			process.env.JWT_SECRET
		);
		req.userId = userId;
		next();
	},
};

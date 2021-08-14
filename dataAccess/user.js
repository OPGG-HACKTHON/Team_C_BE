const { User } = require("../models/index");
const { verifyToken } = require("../util/jwt");
module.exports = {
	checkNewUser: (uid) => {
		return new Promise((res, rej) => {
			User.findOne({
				where: { uid: uid },
			})
				.then((user) => {
					if (user === null) {
						res("notRegistered");
					} else {
						res(user.dataValues.id);
					}
				})
				.catch((err) => {
					rej(err);
				});
		});
	},

	createUser: (user) => {
		return new Promise((res, rej) => {
			User.create({
				uid: user.uid,
				provider: user.provider,
				nickname: user.nickname,
				teamId: user.teamId,
			})
				.then(() => {
					res("success init User");
				})
				.catch((err) => {
					rej(err);
				});
		});
	},

	updateNickname: (uid, newNickname) => {
		return new Promise((res, rej) => {
			User.update(
				{ nickname: newNickname, refreshedAt: Date.now() },
				{
					where: { uid: uid },
				}
			)
				.then(() => {
					res("닉네임변경성공");
				})
				.catch((err) => {
					rej(err);
				});
		});
	},

	updateTeamId: (user, teamId) => {
		return new Promise((res, rej) => {
			if (user.teamUpdatedAt === null) {
				User.update({ teamId: teamId, teamUpdateAt: Date.now() })
					.then(() => {
						res("success");
					})
					.catch((err) => {
						rej(err);
					});
			} else if (
				Date.parse(user.teamUpdatedAt) + 1000 * 60 * 60 * 24 * 30 <
				Date.now()
			) {
				User.update(
					{ teamId: teamId, teamUpdatedAt: Date.now() },
					{
						where: { uid: user.uid },
					}
				)
					.then(() => {
						res("success");
					})
					.catch((err) => {
						rej(err);
					});
			} else {
				const updated = new Date(user.teamUpdatedAt);
				const month = updated.getMonth() + 2; // 1월 = 0 이고 한달뒤 가능하니 +2
				const day = updated.getDate();
				res({
					teamUpdateAvailableAt: `${month}월 ${day}일`,
				});
			}
		});
	},

	getUser: (req) => {
		return new Promise((res, rej) => {
			const token = verifyToken(req.headers.accesstoken);
			const userId = token.userId;
			User.findOne({ where: { id: userId } })
				.then((user) => {
					res(user.dataValues);
				})
				.catch((err) => {
					rej(err);
				});
		});
	},
};

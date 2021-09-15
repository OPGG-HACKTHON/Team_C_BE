const { User, Team } = require("../models/index");
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
				.then((user) => {
					res(user.dataValues.id);
				})
				.catch((err) => {
					rej(err);
				});
		});
	},

	deleteUser: (userId) => {
		return new Promise((res, rej) => {
			User.destroy({ where: { id: userId } })
				.then(() => {
					res("success");
				})
				.catch((err) => {
					rej(err);
				});
		});
	},

	updateNickname: (userId, newNickname) => {
		return new Promise((res, rej) => {
			User.update(
				{ nickname: newNickname, refreshedAt: Date.now() },
				{
					where: { id: userId },
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

	updateTeamId: (userId, teamId) => {
		return new Promise((res, rej) => {
			User.findOne({ where: { id: userId } }).then((user) => {
				if (user.dataValues.teamUpdatedAt === null) {
					User.update(
						{ teamId: teamId, teamUpdateAt: Date.now() },
						{ where: { id: userId } }
					)
						.then(() => {
							res("success");
						})
						.catch((err) => {
							rej(err);
						});
				} else if (
					Date.parse(user.dataValues.teamUpdatedAt) + 1000 * 60 * 60 * 24 * 30 <
					Date.now()
				) {
					User.update(
						{ teamId: teamId, teamUpdatedAt: Date.now() },
						{
							where: { id: userId },
						}
					)
						.then(() => {
							res("success");
						})
						.catch((err) => {
							rej(err);
						});
				} else {
					const updated = new Date(user.dataValues.teamUpdatedAt);
					const month = updated.getMonth() + 2; // 1월 = 0 이고 한달뒤 가능하니 +2
					const day = updated.getDate();
					res({
						teamUpdateAvailableAt: `${month}월 ${day}일`,
					});
				}
			});
		});
	},

	getUser: (userId) => {
		return new Promise((res, rej) => {
			User.findOne({ where: { id: userId } })
				.then((user) => {
					res(user.dataValues);
				})
				.catch((err) => {
					rej(err);
				});
		});
	},

	getTeamIdbyUserId: (userId) => {
		return new Promise((res, rej) => {
			User.findOne({ where: { id: userId } })
				.then((user) => {
					res(user.dataValues.teamId);
				})
				.catch((err) => {
					rej(err);
				});
		});
	},

	getReportedCountbyUserId: (userId) => {
		return new Promise((res, rej) => {
			User.findOne({ where: { id: userId } })
				.then((user) => {
					res(user.dataValues.reportedCount);
				})
				.catch((err) => {
					rej(err);
				});
		});
	},

	// include: [
	//   {
	//     model: Tinder

	getProfileByUid: (id) => {
		return new Promise((res, rej) => {
			User.findOne({ include: [{ model: Team }], where: { id: id } })
				.then((user) => {
					res(user);
				})
				.catch((err) => {
					rej(err);
				});
		});
	},
};

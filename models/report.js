module.exports = (sequelize, DataTypes, user, tinder) => {
	return sequelize.define(
		"report",
		{
			reportFrom: {
				type: DataTypes.INTEGER,
				references: {
					model: user,
					key: "id",
				},
				allowNull: false,
			},
			reportTo: {
				type: DataTypes.INTEGER,
				references: {
					model: user,
					key: "id",
				},
				allowNull: false,
			},
			tinderId: {
				type: DataTypes.INTEGER,
				references: {
					model: tinder,
					key: "id",
				},
				allowNull: false,
			},
			reportMsg: {
				type: DataTypes.TEXT,
			},
		},
		{
			timestamps: false, // ture일 시 시퀄라이저는 createAt, updateAt 컬럼을 추가함.
		}
	);
};

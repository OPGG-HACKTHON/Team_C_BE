module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"tinder",
		{
			message: {
				type: DataTypes.TEXT,
			},
			like: {
				type: DataTypes.INTEGER,
			},
			superlike: {
				type: DataTypes.INTEGER,
			},
			dislike: {
				type: DataTypes.INTEGER,
			},
			pass: {
				type: DataTypes.INTEGER,
			},
		},
		{
			timestamps: true, // ture일 시 시퀄라이저는 createAt, updateAt 컬럼을 추가함.
		}
	);
};

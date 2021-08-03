module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"player",
		{
			nickname: {
				type: DataTypes.STRING(20), // VARCHAR
			},
			role: {
				type: DataTypes.STRING(20), // VARCHAR
			},
			image: {
				type: DataTypes.TEXT, // VARCHAR
			},
			point: {
				type: DataTypes.INTEGER,
			},
			key: {
				type: DataTypes.TEXT,
			},
		},
		{
			timestamps: true, // ture일 시 시퀄라이저는 createAt, updateAt 컬럼을 추가함.
		}
	);
};

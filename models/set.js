module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"set",
		{
			round: {
				type: DataTypes.INTEGER,
			},
			finishedAt: {
				type: DataTypes.DATE,
			},
		},
		{
			timestamps: true, // ture일 시 시퀄라이저는 createAt, updateAt 컬럼을 추가함.
		}
	);
};

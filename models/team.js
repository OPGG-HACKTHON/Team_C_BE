module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"team",
		{
			name: {
				type: DataTypes.STRING(20), // VARCHAR
				unique: true,
			},
			rank: {
				type: DataTypes.INTEGER,
			},
			win: {
				type: DataTypes.INTEGER,
			},
			lose: {
				type: DataTypes.INTEGER,
			},
			rate: {
				type: DataTypes.INTEGER,
			},
		},
		{
			timestamps: false, // ture일 시 시퀄라이저는 createAt, updateAt 컬럼을 추가함.
		}
	);
};

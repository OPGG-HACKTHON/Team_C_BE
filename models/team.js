module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"team",
		{
			name: {
				type: DataTypes.STRING(20), // VARCHAR
				unique: true,
			},
			icon: {
				type: DataTypes.TEXT, // VARCHAR
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
			key: {
				type: DataTypes.TEXT,
			},
		},
		{
			timestamps: true, // ture일 시 시퀄라이저는 createAt, updateAt 컬럼을 추가함.
		}
	);
};

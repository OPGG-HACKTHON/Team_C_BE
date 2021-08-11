module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"POG",
		{
			count: {
				type: DataTypes.INTEGER,
			},
		},
		{
			timestamps: false, // ture일 시 시퀄라이저는 createAt, updateAt 컬럼을 추가함.
			tableName: "POG",
		}
	);
};

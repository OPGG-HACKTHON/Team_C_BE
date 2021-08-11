module.exports = (sequelize, DataTypes, player) => {
	return sequelize.define(
		"game_player",
		{
			count: {
				type: DataTypes.INTEGER,
			},
			playerKey: {
				type: DataTypes.INTEGER,
				references: {
					model: player,
					key: "key",
				},
				allowNull: false,
			},
		},
		{
			timestamps: false, // ture일 시 시퀄라이저는 createAt, updateAt 컬럼을 추가함.
			tableName: "game_player",
		}
	);
};

module.exports = (sequelize, DataTypes, team) => {
	return sequelize.define(
		"game",
		{
			a_team_id: {
				type: DataTypes.INTEGER,
				references: {
					model: team,
					key: "id",
				},
				allowNull: false,
			},
			b_team_id: {
				type: DataTypes.INTEGER,
				references: {
					model: team,
					key: "id",
				},
				allowNull: false,
			},
			a_team_score: {
				type: DataTypes.INTEGER(1),
			},
			b_team_score: {
				type: DataTypes.INTEGER(1),
			},
			startTime: {
				type: DataTypes.DATE,
			},
			status: {
				type: DataTypes.INTEGER,
			},
			finishedAt: {
				type: DataTypes.DATE,
			},
		},
		{
			timestamps: false, // ture일 시 시퀄라이저는 createAt, updateAt 컬럼을 추가함.
		}
	);
};

module.exports = (sequelize, DataTypes, team) => {
	return sequelize.define(
		"game",
		{
			key: {
				type: DataTypes.INTEGER,
				unique: true,
			},
			a_team_id: {
				type: DataTypes.INTEGER,
				references: {
					model: team,
					key: "key",
				},
				allowNull: false,
			},
			b_team_id: {
				type: DataTypes.INTEGER,
				references: {
					model: team,
					key: "key",
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
				//status | -1 시작전, 0 경기 중 ,1 경기끝
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

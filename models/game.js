module.exports = (sequelize, DataTypes, team) => {
	return sequelize.define(
		"game",
		{
			key: {
				type: DataTypes.INTEGER,
				unique: true,
			},
			aTeamId: {
				type: DataTypes.INTEGER,
				references: {
					model: team,
					key: "key",
				},
				allowNull: false,
			},
			bTeamId: {
				type: DataTypes.INTEGER,
				references: {
					model: team,
					key: "key",
				},
				allowNull: false,
			},
			aTeamScore: {
				type: DataTypes.INTEGER(1),
			},
			bTeamScore: {
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

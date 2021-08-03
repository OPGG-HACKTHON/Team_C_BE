module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING(50), // VARCHAR
        unique: true,
        allowNull: false,
      },

      nickname: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
      },
      refreshedAt: {
        type: DataTypes.DATE,
      },
      teamUpdatedAt: {
        type: DataTypes.DATE,
      },
      reportedCount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true, // ture일 시 시퀄라이저는 createAt, updateAt 컬럼을 추가함.
    }
  );
};

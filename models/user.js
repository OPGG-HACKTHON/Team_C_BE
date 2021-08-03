module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      uid: {
        // Kakao, Apple의 유저 ID
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
      provider: {
        // "KaKao" or "Apple"
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50), // VARCHAR
        unique: true,
        allowNull: false,
      },

      nickname: {
        type: DataTypes.STRING(20),
        unique: true,
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

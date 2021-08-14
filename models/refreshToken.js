module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "refreshToken",
    {
      token: {
        type: DataTypes.STRING(1000),
      },
    },
    {
      timestamps: false, // ture일 시 시퀄라이저는 createAt, updateAt 컬럼을 추가함.
    }
  );
};

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      name: {
        type: DataTypes.STRING(20), // VARCHAR
        unique: true,
      },
      age: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false, // ture일 시 시퀄라이저는 createAt, updateAt 컬럼을 추가함.
    }
  );
};

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
      },
      passHash: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      exp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      chosenVocation: {
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
      level_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      vocation_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
};

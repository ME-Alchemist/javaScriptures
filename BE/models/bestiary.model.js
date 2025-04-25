const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Bestiary",
    {
      enemy_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      enemy_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
      },
      img_path: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      exp_drop: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "bestiary",
      timestamps: false,
    }
  );
};

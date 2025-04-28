const { DataTypes } = require("sequelize");

module.exports = (sequelize, models) => {
  return sequelize.define(
    "Levels",
    {
      level_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      exp_required: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vocation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "levels",
      timestamps: false,
    }
  );
};

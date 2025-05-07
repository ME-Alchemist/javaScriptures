const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Vocations",
    {
      vocation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      vocation_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
      },
      vocation_img: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      vocation_portrait: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
    },
    {
      tableName: "vocations",
      timestamps: false,
    }
  );
};

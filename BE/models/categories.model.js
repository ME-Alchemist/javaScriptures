const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Categories",
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
    },
    {
      tableName: "categories",
      timestamps: false,
    }
  );
};

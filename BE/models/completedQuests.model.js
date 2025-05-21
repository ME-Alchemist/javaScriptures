const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Completed",
    {
      completed_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      completed: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      completed_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      times_completed: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "completed_quests",
      timestamps: false,
    }
  );
};

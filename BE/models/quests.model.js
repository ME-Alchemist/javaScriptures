const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Quests",
    {
      quest_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      question: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      answer_a: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      answer_b: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      answer_c: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      correct_answer: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
    },
    {
      tableName: "quests",
      timestamps: false,
    }
  );
};

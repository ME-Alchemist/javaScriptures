const UserModel = require("./user.model");
const BestiaryModel = require("./bestiary.model");
const QuestsModel = require("./quests.model");
const VocationsModel = require("./vocations.model");
const LevelsModel = require("./levels.model");
const CategoriesModel = require("./categories.model");

function initializeModels(sequelize) {
  const User = UserModel(sequelize, require("sequelize").DataTypes);
  const Bestiary = BestiaryModel(sequelize, require("sequelize").DataTypes);
  const Quests = QuestsModel(sequelize, require("sequelize").DataTypes);
  const Vocations = VocationsModel(sequelize, require("sequelize").DataTypes);
  const Levels = LevelsModel(sequelize, require("sequelize").DataTypes);
  const Categories = CategoriesModel(sequelize, require("sequelize").DataTypes);

  User.belongsTo(Levels, { foreignKey: "level_id", as: "level" });
  User.belongsTo(Vocations, { foreignKey: "vocation_id", as: "vocation" });
  Quests.belongsTo(Categories, { foreignKey: "category_id", as: "category" });
  Levels.hasMany(User, { foreignKey: "level_id", as: "users" });
  Vocations.hasMany(User, { foreignKey: "vocation_id", as: "users" });
  Categories.hasMany(Quests, { foreignKey: "category_id", as: "quests" });

  return {
    User,
    Bestiary,
    Quests,
    Vocations,
    Levels,
    Categories,
  };
}

module.exports = initializeModels;

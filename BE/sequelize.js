const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(
  isProduction ? process.env.PROD_DB_NAME : process.env.DEV_DB_NAME,
  isProduction ? process.env.PROD_DB_USER : process.env.DEV_DB_USER,
  isProduction ? process.env.PROD_DB_PASS : process.env.DEV_DB_PASS,
  {
    host: isProduction ? process.env.PROD_DB_HOST : process.env.DEV_DB_HOST,
    port: isProduction ? process.env.PROD_DB_PORT : process.env.DEV_DB_PORT,
    dialect: isProduction ? process.env.PROD_DB_DIALECT : "mysql",
    dialectOptions: isProduction
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {},
    logging: false,
  }
);

module.exports = sequelize;

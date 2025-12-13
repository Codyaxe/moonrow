const Sequelize = require("sequelize");
const env = require("dotenv");
env.config();

// For Deployment
const DB_HOST = process.env.DB_HOST || process.env.MYSQLHOST;
const DB_PORT = process.env.DB_PORT || process.env.MYSQLPORT || 3306;
const DB_NAME = process.env.DB_NAME || process.env.MYSQLDATABASE;
const DB_USER = process.env.DB_USER || process.env.MYSQLUSER;
const DB_PASSWORD = process.env.DB_PASSWORD || process.env.MYSQLPASSWORD;

if (!DB_NAME) {
  throw new Error(
    "Database name not set. Set DB_NAME or MYSQLDATABASE in environment variables."
  );
}
if (!DB_USER) {
  throw new Error(
    "Database user not set. Set DB_USER or MYSQLUSER in environment variables."
  );
}

// const DB_HOST = process.env.DB_HOST || "127.0.0.1";
// const DB_PORT = process.env.DB_PORT || 3306;
// // Accept either DB_NAME or DB_DATABASE (compatibility)
// const DB_NAME = process.env.DB_NAME || process.env.DB_DATABASE;
// const DB_USER = process.env.DB_USER || process.env.DB_USERNAME;
// // Accept DB_PASSWORD or DB_PASS; default to empty string if not set
// const DB_PASSWORD = process.env.DB_PASSWORD || process.env.DB_PASS || "";

// if (!DB_NAME) {
//   throw new Error("Database name not set. Set DB_NAME or DB_DATABASE in .env");
// }
// if (!DB_USER) {
//   // allow empty password but username must be present
//   throw new Error("Database user not set. Set DB_USER or DB_USERNAME in .env");
// }

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: "mysql",
  host: DB_HOST,
  port: DB_PORT,
  logging: false, // Disable SQL logging in production
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;

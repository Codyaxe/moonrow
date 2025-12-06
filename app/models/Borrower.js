const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const Borrower = sequelize.define(
  "borrower",
  {
    BorrowerID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    FirstName: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    LastName: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    Email: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    Phone: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: "Borrowers",
    timestamps: false,
  }
);

module.exports = Borrower;

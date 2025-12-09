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
      type: Sequelize.STRING,
      allowNull: false,
    },
    LastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Borrowers",
    timestamps: false,
  }
);

module.exports = Borrower;

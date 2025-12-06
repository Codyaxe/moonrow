const Sequelize = require("sequelize");
const sequelize = require("../../config/database");
const Book = require("./Book");
const Borrower = require("./Borrower");

const Loan = sequelize.define(
  "loan",
  {
    LoanID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    BookID: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    BorrowerID: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    BorrowDate: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
    ReturnDate: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },
    Status: {
      type: Sequelize.ENUM("Borrowed", "Returned"),
      defaultValue: "Borrowed",
    },
  },
  {
    tableName: "Loans",
    timestamps: false,
  }
);

// Define associations
Loan.belongsTo(Book, { foreignKey: "BookID", as: "book" });
Loan.belongsTo(Borrower, { foreignKey: "BorrowerID", as: "borrower" });

module.exports = Loan;

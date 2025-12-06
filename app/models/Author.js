const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const Author = sequelize.define(
  "author",
  {
    AuthorID: {
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
  },
  {
    tableName: "Authors",
    timestamps: false,
  }
);

module.exports = Author;

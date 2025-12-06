const Sequelize = require("sequelize");
const sequelize = require("../../config/database");
const Author = require("./Author");

const Book = sequelize.define(
  "book",
  {
    BookID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Title: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    AuthorID: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    Genre: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    PublishedYear: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    CopiesAvailable: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "Books",
    timestamps: false,
  }
);

// Define association
Book.belongsTo(Author, { foreignKey: "AuthorID", as: "author" });
Author.hasMany(Book, { foreignKey: "AuthorID", as: "books" });

module.exports = Book;

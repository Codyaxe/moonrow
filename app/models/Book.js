const Sequelize = require("sequelize");
const sequelize = require("../../config/database");
const Author = require("./Author");
const Genre = require("./Genre");

const Book = sequelize.define(
  "Book",
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
    GenreID: {
      type: Sequelize.INTEGER,
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

// Define associations
Book.belongsTo(Author, { foreignKey: "AuthorID", as: "author" });
Author.hasMany(Book, { foreignKey: "AuthorID", as: "books" });

Book.belongsTo(Genre, { foreignKey: "GenreID", as: "genre" });
Genre.hasMany(Book, { foreignKey: "GenreID", as: "books" });

module.exports = Book;

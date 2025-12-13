const Sequelize = require("sequelize");
const sequelize = require("../../config/database");
const Author = require("./Author");
const Genre = require("./Genre");
const BookGenre = require("./BookGenre");

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

// Many-to-many relationship with Genre through BookGenre
Book.belongsToMany(Genre, {
  through: BookGenre,
  foreignKey: "BookID",
  otherKey: "GenreID",
  as: "genres",
});
Genre.belongsToMany(Book, {
  through: BookGenre,
  foreignKey: "GenreID",
  otherKey: "BookID",
  as: "books",
});

module.exports = Book;

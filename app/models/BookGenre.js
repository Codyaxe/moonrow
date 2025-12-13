const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const BookGenre = sequelize.define(
  "BookGenre",
  {
    BookGenreID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    BookID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Books",
        key: "BookID",
      },
    },
    GenreID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Genres",
        key: "GenreID",
      },
    },
  },
  {
    tableName: "BookGenres",
    timestamps: false,
  }
);

module.exports = BookGenre;

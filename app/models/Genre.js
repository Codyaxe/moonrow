const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const Genre = sequelize.define(
  "Genre",
  {
    GenreID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    GenreName: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Genres",
    timestamps: false,
  }
);

module.exports = Genre;

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

const Session = sequelize.define(
  "session",
  {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: DataTypes.STRING,
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  },
  {
    tableName: "sessions",
    timestamps: false,
  }
);

module.exports = Session;

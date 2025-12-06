const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const Item = sequelize.define("item", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Item;

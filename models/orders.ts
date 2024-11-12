import { DataTypes } from "sequelize";
import { sequelize } from "connections/sequelize";

export const Order = sequelize.define("order", {
  product_id: DataTypes.INTEGER,
  title: DataTypes.STRING,
  status: DataTypes.STRING,
  date: DataTypes.DATE,
});

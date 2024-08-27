import { DataTypes } from "sequelize";
import { sequelize } from "connections/sequelize";

export const User = sequelize.define("user", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

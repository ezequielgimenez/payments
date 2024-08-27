import { DataTypes } from "sequelize";
import { sequelize } from "connections/sequelize";

export const Auth = sequelize.define("auth", {
  email: DataTypes.STRING,
  code: DataTypes.STRING,
  expire: DataTypes.DATE,
});

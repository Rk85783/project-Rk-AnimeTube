import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const User = sequelize.define(
	'User',
	{
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userType: {
			type: DataTypes.ENUM,
			values: ["admin", "user"],
			defaultValue: "user"
		},
	},
	{
		underscored: true
	},
);
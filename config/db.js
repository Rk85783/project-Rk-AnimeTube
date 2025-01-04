import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(process.env.POSTGRES_EXTERNAL_DATABASE_URL);
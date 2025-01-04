import "dotenv/config";
import express from "express";
import { sequelize } from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/users", userRoutes);

try {
	await sequelize.authenticate();
	console.log('Connection has been established successfully.');

	await sequelize.sync({ logging: false });
	console.log('All models were synchronized successfully.');

	const appName = process.env.APP_NAME;
	const appPort = process.env.APP_PORT || 4001;

	app.listen(appPort, () => {
		console.info(`${appName} is running at http://localhost:${appPort}`);
	});
} catch (error) {
	console.error('Unable to connect to the database:', error);
}
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { generateToken } from "../services/authService.js";

export const register = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existUser = await User.findOne({ where: { email } });
		if (existUser) {
			return res.status(400).json({ message: "Email is already exists." });
		}

		const hashPassword = bcrypt.hashSync(password, 10);
		await User.create({ email, password: hashPassword });

		res.status(201).json({ message: "You are registered successfully." });
	} catch (error) {
		console.error("register(): catch error: %o", error);
		res.status(500).json({ message: "Something went wrong. Please try again." });
	}
}

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existUser = await User.findOne({ where: { email } });
		if (!existUser) {
			return res.status(404).json({ message: "User not found." });
		}
		const token = generateToken(existUser);
		res.status(200).json({
			message: "You are logged in successfully.",
			data: {
				token
			}
		});
	} catch (error) {
		console.error("login(): catch error: %o", error);
		res.status(500).json({ message: "Something went wrong. Please try again." });
	}
}
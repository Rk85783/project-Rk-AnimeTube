import { User } from "../models/User.js";

export const getAllUsersList = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const startIndex = (page - 1) * limit;
	try {
		const allUsers = await User.findAndCountAll({
			attributes: { exclude: ['password'] },
			raw: true,
			limit,
			offset: startIndex,
			order: [
				["createdAt", "desc"]
			]
		});
		res.status(200).json({
			message: "Users list fetched successfully.",
			data: {
				totalCounts: allUsers.count,
				totalPages: Math.ceil(allUsers.count / limit),
				users: allUsers.rows
			},
		});
	} catch (error) {
		console.error("getAllUsersList(): catch error: %o", error);
		res.status(500).json({ message: "Something went wrong. Please try again." });
	}
}
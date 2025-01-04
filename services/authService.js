import jwt from 'jsonwebtoken';

const generateToken = (user) => {
	return jwt.sign(
		{
			userId: user.id,
			email: user.email,
			role: user.userType
		},
		process.env.JWT_SECRET_KEY,
		{
			expiresIn: '1h'
		}
	);
};

export { generateToken };

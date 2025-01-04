import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {

	console.log(req.headers.authorization)

	const token = req.headers.authorization?.split(' ')[1];
	if (!token) return res.status(401).json({ message: 'Access denied' });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(403).json({ message: 'Invalid token' });
	}
};

const authorize = (roles) => (req, res, next) => {
	if (!roles.includes(req.user.role)) {
		return res.status(403).json({ message: 'Forbidden' });
	}
	next();
};

export { authenticate, authorize };

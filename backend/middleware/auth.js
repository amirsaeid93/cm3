const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1];
    if (!token) {
        return res.status(401).send({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticate;

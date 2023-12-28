const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { _id } = jwt.verify(token, process.env.SECRET);

        req.user = await User.findOne({ _id }).select('_id');
        if (!req.user) {
            return res.status(401).json({ error: 'No Token' });
        }

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Send a message indicating token expiration
            return res.status(401).json({ error: 'Token expired. Please log in again.' });
        }

        console.error(error);
        return res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;

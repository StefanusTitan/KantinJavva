const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    // Get the token from the header
    const token = req.header('Authorization');

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET);

        // Check if user is an admin
        if (!decoded.user.isAdmin) {
            return res.status(403).json({ message: 'User is not an admin' });
        }

        // Add user from payload to the request object
        req.user = decoded.user;

        next();
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

module.exports = isAdmin;

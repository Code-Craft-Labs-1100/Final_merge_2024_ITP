const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Please log in again.' });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;  // Attaching the decoded user ID to the request body
        next();  // Passing control to the next middleware or route handler
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

module.exports = authMiddleware;

const { JWT_SECRET } = require('./config')
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){

        return res.status(403).json({});
    }
    
}
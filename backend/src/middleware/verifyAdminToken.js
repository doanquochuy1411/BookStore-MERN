const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const { ErrorResponse } = require('../utils/responseHelper');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyAdminToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).send(
            ErrorResponse(StatusCodes.UNAUTHORIZED, "Access Denied. No token provided")
        )
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) { 
            return res.status(StatusCodes.FORBIDDEN).send(
                ErrorResponse(StatusCodes.FORBIDDEN, "Invalid credentials")
            )
        }

        req.user = user;
        next();
    })
}

module.exports = verifyAdminToken;
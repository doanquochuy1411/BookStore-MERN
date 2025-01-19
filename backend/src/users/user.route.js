const express = require('express');
const { ErrorResponse, SuccessResponse } = require('../utils/responseHelper');
const { StatusCodes } = require('http-status-codes');
const User = require('./user.model');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
    const {userName, password} = req.body;
    try {
        const admin = await User.findOne({userName})
        if (!admin) {
            res.status(StatusCodes.NOT_FOUND).send(
                ErrorResponse(StatusCodes.NOT_FOUND, "Admin not found!")
            )
        }

        if (password !== admin.password) {
            res.status(StatusCodes.UNAUTHORIZED).send(
                ErrorResponse(StatusCodes.UNAUTHORIZED, "Invalid password!")
            )
        }

        const token = jwt.sign(
            {id: admin._id, userName: admin.userName, role: admin.role},
            JWT_SECRET,
            {expiresIn: "1h"}
        )

        res.status(StatusCodes.OK).send(
            SuccessResponse(StatusCodes.OK, 
                {
                    accessToken: token, 
                    user: { 
                        userName: admin.userName,
                        role: admin.role
                    }
                }, "Login successfully")
        )
    } catch (error) {
        console.log("Invalid credentials", error)
        res.status(StatusCodes.UNAUTHORIZED).send(
                    ErrorResponse(StatusCodes.UNAUTHORIZED, "Invalid credentials")
                )
    }
})

module.exports = router;
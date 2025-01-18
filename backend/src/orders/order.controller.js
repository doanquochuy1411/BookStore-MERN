const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/responseHelper");
const Order = require("./order.model");

const createOrder = async (req, res) => {
    try {
        const newOrder = await Order({...req.body});
        await newOrder.save();
        res.status(StatusCodes.OK).send(
            SuccessResponse(StatusCodes.OK, newOrder, "Order created successfully")
        )
    } catch (error) {
        console.log("Error creating order", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR,"Failed to create order")
        )
    }
}

const getOrderByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const orders = await Order.find({email: email}).sort({createdAt: -1});
        if (!orders) {
            return res.status(StatusCodes.NOT_FOUND).send(
                ErrorResponse(StatusCodes.NOT_FOUND,"Order not found")
            )
        }

        res.status(StatusCodes.OK).send(
            SuccessResponse(StatusCodes.OK, orders, "Orders fetching successfully")
        )
    } catch (error) {
        console.log("Error fetching orders: ", error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Error fetching orders")
        )
    }
}

module.exports = {
    createOrder,
    getOrderByEmail
}
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/responseHelper");
const Order = require("./order.model");
const OrderRepoClass = require("../repository/mongo/order.repo");
const OrderServiceClass = require("../service/order.service")

const orderRepo = new OrderRepoClass(Order); 
const orderService = new OrderServiceClass(orderRepo);

const createOrder = async (req, res) => {
    try {   
        const newOrder = await orderService.createOrder({...req.body});
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
        const orders = await orderService.getOrderByEmail(email);
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
const { ErrorResponse, SuccessResponse } = require("../utils/responseHelper");
const Cart = require("./cart.model");
const {StatusCodes} = require("http-status-codes");

const addToCart = async(req, res) => {
    try{
        // let cart = await Cart.findOne({ user: userId });
        console.log(req.body)
        // if (!cart) {
        //     // cart = new Cart({
        //     //     user: userId,
        //     //     products: [
        //     //         req.body
        //     //     ]
        //     // })
        // } else {
        //     const productIndex = cart.products.findIndex(
        //         (item) => item.productId.toString() === 
        //     )
        // }

        res.status(StatusCodes.OK).send(
            SuccessResponse(StatusCodes.OK, newBook, "Book posted successfully")
        )
        return
    } catch (error) {
        console.log("Error creating book", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR,"Failed to add to cart")
        )
        return
    } 
}

module.exports = {
    addToCart
}
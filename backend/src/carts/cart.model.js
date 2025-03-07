const mongoose = require('mongoose');
const User = require('../users/user.model');

const cartSchema = new mongoose.Schema({
    user: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book', // Tham chiếu đến collection Product
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1, // Mặc định số lượng là 1
            },
        },
    ],
},{
        timestamps: true,
    })


    const Cart = mongoose.model('Cart', cartSchema)
    
    module.exports = Cart;
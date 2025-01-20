const mongoose = require('mongoose');
const express = require('express');
const Order = require('../orders/order.model');
const Book = require('../books/book.model');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require('../utils/responseHelper');
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        // 1. Total number of orders
        const totalOrders = await Order.countDocuments();
        // 2. Total sales (sum of all totalPrice from orders)
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: {
                        $sum: "$totalPrice",
                    }
                }
            }
        ])

        // 4. Trending books statistics
        const trendingBooksCount = await Book.aggregate([
            { $match: {trending: true}}, // Matches only trending books
            { $count: "trendingBookCount"} // Return the count of trending books
        ])

        // if you want just the count as a number, you can extract it like this:
        const trendingBooks = trendingBooksCount.length > 0 ? trendingBooksCount[0].trendingBooksCount : 0;

        // 5. Total number of books
        const totalBooks = await Book.countDocuments();

        // 6. Monthly sales (group by month and sum total sales for each month)
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: {format: "%Y-%m", date: "$createdAt"}},
                    totalSales: {$sum: "$totalPrice"}, // Sum totalPrice for each month
                    totalOrders: {$sum: 1} // count total orders for each month
                }
            },
            { $sort: {_id: 1}}
        ]);

        const dataResponse = {
            totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            trendingBooks,
            totalBooks,
            monthlySales
        }

        res.status(StatusCodes.OK).send(
            SuccessResponse(StatusCodes.OK, dataResponse, "Stats fetching successfully")
        )
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to fetching stats")
        )
    }
})

module.exports = router


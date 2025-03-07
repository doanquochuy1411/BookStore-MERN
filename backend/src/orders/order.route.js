const express = require('express');
const { createOrder, getOrderByEmail } = require('./order.controller');
const router = express.Router();

// create order endpoint
router.post("/", createOrder)

// get order by user email
router.get("/email/:email", getOrderByEmail)

// // single book endpoint
// router.get("/:id", getSingleBook)

// // update book endpoint
// router.put("/:id", updateBook)

// // delete book endpoint
// router.delete("/:id", deleteBook)

module.exports = router;
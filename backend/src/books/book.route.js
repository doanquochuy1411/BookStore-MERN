const express = require('express');
const { postABook, getAllBooks, getSingleBook, updateBook, deleteBook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

// post a book
router.post("/", verifyAdminToken, postABook)

// get all books
router.get("/", getAllBooks)

// single book endpoint
router.get("/:id", getSingleBook)

// update book endpoint
router.put("/:id", verifyAdminToken, updateBook)

// delete book endpoint
router.delete("/:id",verifyAdminToken, deleteBook)

module.exports = router;
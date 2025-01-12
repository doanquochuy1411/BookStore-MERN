const express = require('express');
const { postABook, getAllBooks, getSingleBook, updateBook, deleteBook } = require('./book.controller');
const router = express.Router();

// post a book
router.post("/", postABook)

// get all books
router.get("/", getAllBooks)

// single book endpoint
router.get("/:id", getSingleBook)

// update book endpoint
router.put("/:id", updateBook)

// delete book endpoint
router.delete("/:id", deleteBook)

module.exports = router;
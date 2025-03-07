const { ErrorResponse, SuccessResponse } = require("../utils/responseHelper");
const Book = require("./book.model");
const {StatusCodes} = require("http-status-codes");

const postABook = async(req, res) => {
    try{
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(StatusCodes.OK).send(
            SuccessResponse(StatusCodes.OK, newBook, "Book posted successfully")
        )
    } catch (error) {
        console.log("Error creating book", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR,"Failed to create book")
        )
    } 
}

// get all books
const getAllBooks = async (req, res) => {
    try{
        const books = await Book.find().sort({createAt: -1});
        res.status(StatusCodes.OK).send(
            SuccessResponse(StatusCodes.OK, books, "Books fetched successfully")
        ) 
    } catch (error) {
        console.log("Error fetching book", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR,"Failed to fetch books")
        )
    } 
}

const getSingleBook = async (req, res) =>{
    try{
        const { id } = req.params
        const book = await Book.findById(id);
        if (!book){
            res.status(StatusCodes.NOT_FOUND).send(
                ErrorResponse(StatusCodes.NOT_FOUND,"Book not found")
            )
            return
        }
        res.status(StatusCodes.OK).send(
            SuccessResponse(StatusCodes.OK, book, "The book fetched successfully")
        ) 
    } catch (error) {
        console.log("Error fetching book", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR,"Failed to fetch books")
        )
    } 
}

// update book data
const updateBook = async (req, res) =>{
    try{
        const { id } = req.params
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
        
        if (!updatedBook){
            res.status(StatusCodes.NOT_FOUND).send(
                ErrorResponse(StatusCodes.NOT_FOUND,"Book is not Found")
            )
        }

        res.status(StatusCodes.OK).send(
            SuccessResponse(StatusCodes.OK, updatedBook, "Book updated successfully")
        ) 
    } catch (error) {
        console.log("Error updating book", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR,"Failed to update a book")
        )
    } 
}

// delete book data
const deleteBook = async (req, res) =>{
    try{
        const { id } = req.params
        const deletedBook = await Book.findByIdAndDelete(id);
        
        if (!deletedBook){
            res.status(StatusCodes.NOT_FOUND).send(
                ErrorResponse(StatusCodes.NOT_FOUND,"Book is not Found!")
            )
        }

        res.status(StatusCodes.OK).send(
            SuccessResponse(StatusCodes.OK, deletedBook, "Book deleted successfully")
        ) 
    } catch (error) {
        console.log("Error deleting book", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
            ErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR,"Failed to delete a book")
        )
    } 
}

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook
}
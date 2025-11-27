const Book = require("../models/Book")



const createBook = async (req, res) => {
    try {
        const{title, author, subtitle, chapters} = req.body;

        if (!title || !author) {
         res.status(400).json({ message: "Please provide a title and author" });   
        }

        const book = await Book.create({
            userId : req.user._id,
            title,
            author,
            subtitle,
            chapters,
        });

        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getBooks = async (req, res) => {
    try {
        const books = (await Book.find({userId: req.user._id})).toSorted({createdAt: -1});
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if(!book){
             res.status(404).json({ message: "Book not found" });
        }

        if(book.userId.toString() !== req.user._id.toString()){
           return  res.status(401).json({ message: "Not authorized to view this book" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateBook = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const deleteBook = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateBookCover = async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    updateBookCover,
};
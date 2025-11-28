const Book = require("../models/Book")



const createBook = async (req, res) => {
    try {
        const { title, author, subtitle, chapters } = req.body;

        if (!title || !author) {
            res.status(400).json({ message: "Please provide a title and author" });
        }

        const book = await Book.create({
            userId: req.user._id,
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
        const books = await Book.find({ userId: req.user._id }).toSorted({ createdAt: -1 });
        res.status(201).json(books);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        if (book.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to view this book" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (book.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to update this book" });
        }
        const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.status(200).json(updateBook);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (book.userId.toString() !== req.user._id.toString) {
            return res.status(401).json({ message: "not authorized to delete this book " });
        }
        await book.deleteOne();
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updateBookCover = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        if (book.userId.toString() !== req.user._id.toString) {
            return res.status(401).json({ message: "not authorized to delete this book " });
        }


        if(req.file){
            book.coverImage = `/${req.file.path}`;
        }else{
             return res.status(400).json({ message: "No image file provided " });
        }

        const updatedBook = await book.save();
         res.status(200).json(updatedBook);
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
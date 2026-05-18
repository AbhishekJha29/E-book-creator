const express = require("express")
const router = express.Router();
const {
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook,
    updateBookCover,
    getBookCover,
} = require("../controller/bookController");
const { protect } = require("../middlewares/authMiddlewares");
const upload = require("../middlewares/uploadMiddlewares");

router.use(protect);

router.route("/").post(createBook).get(getBooks);
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);
router.route("/cover/:id").get(getBookCover).put(upload, updateBookCover);

module.exports = router;
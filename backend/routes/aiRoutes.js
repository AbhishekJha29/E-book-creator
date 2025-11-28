const express = require("express");
const router = express.Router();
const {generateOutline, generateChapterContent } = require("../controller/aiController");
const { protect } = require("../middlewares/authMiddlewares");
router.use(protect);
router.use("/generate-outline", generateOutline);
router.use("/generat-chapter-content", generateChapterContent);


module.exports = router;
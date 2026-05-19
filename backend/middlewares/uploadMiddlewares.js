const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Use /tmp on Vercel, local uploads folder in development
const uploadDir = process.env.VERCEL === "1" ? "/tmp" : "uploads";

// Only create uploads directory when running locally
if (process.env.VERCEL !== "1") {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      `${file.fieldname || "coverImage"}-${uniqueSuffix}${path.extname(
        file.originalname
      )}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Images Only!"));
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("coverImage");

module.exports = upload;
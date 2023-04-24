const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.filename}-${Date.now()}${ext}`);
  },
});

const fileFiltercustom = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".pdf" && ext !== ".docx") {
    return cb(new Error("Only PDF and DOCX files are allowed"));
  }
  cb(null, true);
};

exports.upload = multer({ storage: storage, fileFilter: fileFiltercustom });

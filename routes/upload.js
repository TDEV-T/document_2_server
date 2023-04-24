var express = require("express");
var router = express.Router();

//controler
const { download } = require("./../controller/upload");

//middleware
const { upload } = require("./../middleware/uploadfile");

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).send("No File Uploaded");
  } else {
    res.send(`file uploaded :{$req.file.filename}`);
  }
});

router.get("/download/:filename", download);

module.exports = router;

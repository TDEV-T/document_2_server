var express = require("express");
var router = express.Router();
//auth
const { auth } = require("./../middleware/Auth");
//controler
const {
  getFileAll,
  editFile,
  deleteFileSingle,
  deleteFile,
} = require("./../controller/File");
//middleware
const { upload } = require("./../middleware/uploadfile");

router.post("/getFileAll", auth, getFileAll);
router.post("/editFileImg", auth, upload.single("file"), editFile);
router.post("/deleteFileSingle", auth, deleteFileSingle);
router.get("/delete", deleteFile);

module.exports = router;

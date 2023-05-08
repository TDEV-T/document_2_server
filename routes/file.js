var express = require("express");
var router = express.Router();
//auth
const { auth } = require("./../middleware/Auth");
//controler
const { getFileAll, editFile } = require("./../controller/File");
//middleware
const { upload } = require("./../middleware/uploadfile");

router.post("/getFileAll", auth, getFileAll);
router.post(
  "/editFile",
  upload.fields([
    { name: "file1" },
    { name: "file2" },
    { name: "file3" },
    { name: "file4" },
    { name: "file5" },
  ]),
  editFile
);

module.exports = router;

var express = require("express");
var router = express.Router();
//auth
const { auth } = require("./../middleware/Auth");
//controler
const { download, uploadFile, zipDownload } = require("./../controller/upload");

//middleware
const { upload } = require("./../middleware/uploadfile");

// router.post("/upload", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     res.status(400).send("No File Uploaded");
//   } else {
//     res.send(`file uploaded :{$req.file.filename}`);
//   }
// });

router.post(
  "/fileupload",
  auth,
  upload.fields([
    { name: "file1" },
    { name: "file2" },
    { name: "file3" },
    { name: "file4" },
    { name: "file5" },
  ]),
  uploadFile
);

// router.get("/download/:filename", auth, download);

router.post("/download", auth, zipDownload);

module.exports = router;

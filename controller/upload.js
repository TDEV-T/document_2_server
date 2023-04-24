const path = require("path");
const fs = require("fs");
exports.download = async (req, res, next) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join("uploads/", filename);

    console.log(filePath);
    // check if file exists
    const fileExists = await fs.promises
      .stat(filePath)
      .then((stat) => stat.isFile())
      .catch(() => false);
    if (!fileExists) {
      return res.status(404).send("File not found");
    }

    // download file
    res.download(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error while downloading");
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: "Server Error !" });
  }
};

const path = require("path");
const fs = require("fs");
const archiver = require("archiver");
const mongoose = require("mongoose");
const File = require("./../models/File");

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

exports.uploadFile = async (req, res, next) => {
  try {
    const reqfiles = req.files;
    const filename = {};

    var fileCheck = await File.findOne({ title: req.body.header });

    if (fileCheck) {
      return res.status(400).send("File header already to use !");
    }

    Object.keys(reqfiles).map((key) => {
      const fileArray = reqfiles[key];
      const filteredArray = fileArray.filter((file) => {
        return file.fieldname === key;
      });

      const filenameArray = filteredArray.map((file) => {
        return file.filename;
      });

      filename[key] = filenameArray;
    });

    const newFile = new File({
      title: req.body.header,
      content: req.body.content,
      files: {
        file1: filename.file1,
        file2: filename.file2,
        file3: filename.file3,
        file4: filename.file4,
        file5: filename.file5,
      },
      category: "Normal",
    });

    newFile
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "Create Success !",
          topic: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: "Server Error !" });
  }
};

exports.zipDownload = async (req, res, next) => {
  try {
    const idobject = req.body.data;
    const filetoZip = [];
    File.find({ _id: idobject })
      .then((fileQuery) => {
        const arrays = Object.values(fileQuery[0].files);
        const filenames = arrays.flat();
        const archive = archiver("zip");

        const filesDir = path.join(__dirname, "");
        const files = [];

        filenames.forEach((filename) => {
          const file = path.join("uploads/", filename);
          console.log(file);
          if (fs.existsSync(file)) {
            files.push(file);
          } else {
            return res.status(500).send("File not Exists !");
          }
        });

        files.forEach((file) => {
          archive.file(file, { name: path.basename(file) });
        });

        archive.on("error", function (err) {
          res.status(500).send({ error: err.message });
        });

        res.attachment("archive.zip");
        archive.pipe(res);
        archive.finalize();
      })
      .catch((err) => {
        res.status(500).send("File not Found");
      });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: "Server Error !" });
  }
};

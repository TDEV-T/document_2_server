const mongoose = require("mongoose");
//Model
const File = require("./../models/File");

exports.getFileAll = async (req, res, next) => {
  try {
    File.find()
      .then((file) => res.json(file))
      .catch((err) => res.status(500).send("Error Server"));
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: "Server Error !" });
  }
};

exports.editFile = async (req, res, next) => {
  try {
    const id_object = req.body._id;
    File.find({ _id: id_object })
      .then((file) => {
        const reqfiles = req.files;
        const filename = {};
        const filebodyreq = req.body.files;

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

        // const filePack3 = {};

        // for (const key in filebodyreq) {
        //   if (key in filename) {
        //     filePack3[key] = filebodyreq[key].concat(filename[key]);
        //   }
        // }
        res.send(clg);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

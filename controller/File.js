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
    const fileUpdate = req.file;
    const {id}
    console.log(req.body);
    res.json({
      status: "done",
      url: "http://localhost:3306",
      fileUpdate,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

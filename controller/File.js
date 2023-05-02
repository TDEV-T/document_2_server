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

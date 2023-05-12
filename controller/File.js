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
    const { id, type } = req.body;

    const filter = { _id: id };
    const updateFields = {};
    updateFields[`files.${type}`] = fileUpdate.filename;

    const update = { $push: updateFields };
    const result = await File.updateOne(filter, update);

    // res.json({
    //   status: "done",
    //   url: "http://localhost:3306",
    //   fileUpdate,
    // });
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

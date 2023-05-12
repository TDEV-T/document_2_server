const mongoose = require("mongoose");
//Model
const File = require("./../models/File");
//fs
const fs = require("fs");

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

exports.deleteFileSingle = async (req, res, next) => {
  try {
    const { id_object, filename, type } = req.body;

    const filePath = `uploads/${filename}`;

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("เกิดข้อผิดพลาด", err);
        return;
      }

      console.log("ไฟล์ถูกลบแล้ว", filePath);
    });

    const filter = { _id: id_object };
    const updateFields = {};
    updateFields[`files.${type}`] = filename;

    const update = { $pull: updateFields };
    const result = await File.updateOne(filter, update);
    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.deleteFile = async (req, res, next) => {
  try {
    console.log(req.query.id);
    const result = await File.deleteOne({ _id: req.query.id });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

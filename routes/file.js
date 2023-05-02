var express = require("express");
var router = express.Router();
//auth
const { auth } = require("./../middleware/Auth");
//controler
const { getFileAll } = require("./../controller/File");

router.post("/getFileAll", auth, getFileAll);

module.exports = router;

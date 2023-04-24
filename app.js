const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { readdirSync } = require("fs");
const multer = require("multer");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb+srv://root:1234@crud-document.d3jgxvm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connect success"))
  .catch((err) => console.log(err));

//middle ware
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());
app.use(express.json());

readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.listen(3456, (err) => {
  console.log("Server Started");
});

var express = require("express");
var router = express.Router();

//controller
const {
  getAllUsers,
  createUser,
  loginUser,
  currentUser,
} = require("./../controller/User");


/* GET users listing. */
router.get("/users", getAllUsers);

router.post("/register", createUser);

router.post("/login", loginUser);
router.post("/currentUser", currentUser);

module.exports = router;

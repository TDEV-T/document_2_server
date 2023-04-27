var express = require("express");
var router = express.Router();

//controller
const {
  getAllUsers,
  createUser,
  loginUser,
  currentUser,
} = require("./../controller/User");
//middleware
const { auth } = require("./../middleware/Auth");

/* GET users listing. */
router.get("/users", getAllUsers);

router.post("/register", createUser);

router.post("/login", loginUser);
router.post("/currentUser", auth, currentUser);

module.exports = router;

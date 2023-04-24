const mongoose = require("mongoose");
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TokenManager = require("./functions/token/token_manager");

exports.getAllUsers = async (req, res, next) => {
  try {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: "Server Error !" });
  }
};

exports.createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    var user = await User.findOne({ username: username });

    if (user) {
      return res.status(400).send("User already to use !");
    }

    const salt = await bcrypt.genSalt(10);

    user = new User({
      username,
      password,
      role: "user",
    });

    //Encrypt
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    return res.json({ status: "success", message: "Register Success" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: "Server Error !" });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    User.findOne({ username: username }).then((user) => {
      console.log(user);
      if (user) {
        let cmp = bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            const payload = {
              user: {
                username: user.username,
                role: user.role,
              },
            };

            let token = TokenManager.getGenerateToken(payload);
            res.json({
              status: "success",
              messge: "Login success",
              user: {
                iduser: user._id,
                username: user.username,
                role: user.role,
              },
              token: token,
            });
          } else {
            return res.status(400).send("Password Invalid !");
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: "Server Error !" });
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    User.findOne({ username: username })
      .then((user) => {
        console.log(user);
        res.json({
          user: {
            iduser: user._id,
            username: user.username,
            role: user.role,
          },
          token: token,
        });
      })
      .catch((err) => res.status(400).send(err));
  } catch (err) {
    console.log(err);
    res.status(400).send("Server Error !");
  }
};

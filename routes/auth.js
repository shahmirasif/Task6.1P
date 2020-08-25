const express = require("express");
const router = express.Router();
const validator = require("../validations/user.js");
const User = require("../models/User.js");
const mailer = require("../emails/welcome.js");

router.post("", async (req, res) => {
  const {error} = validator(req.body);

  if (error) {
    var msg;
    error.details ? (msg = error.details[0].message) : (msg = error.message);
    return res.status(400).json({
      status: 400,
      message: msg,
    });
  }

  let user = await User.checkUser(req.body);

  if (user)
    return res.status(400).json({
      status: 400,
      message: "User with the given email already exists",
    });

  user = await User.createUser(req.body);

  if (!user || user._message)
    return res.status(404).json({
      status: 404,
      message: "Unable to create user",
    });

  res.status(200).json({
    status: 200,
    message: "Sign up successfull",
  });

  await mailer(user);
});

module.exports = router;

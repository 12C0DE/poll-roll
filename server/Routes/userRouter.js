const express = require("express");
const router = express.Router();
const User = require("../Models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:authId", async (req, res) => {
  console.log(`userID: ${req.params.authId}`);

  try {
    const specUser = await User.findOne({ authId: req.params.authId });
    res.json(specUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/post", async (req, res) => {
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    authId: req.body.authId,
  });

  const savedUser = await user.save();
  try {
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

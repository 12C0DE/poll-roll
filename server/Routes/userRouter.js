const express = require("express");
const cors = require("cors");
const router = express.Router();
const User = require("../Models/User");

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.get("/", cors(corsOptions), async (req, res) => {
  try {
    const users = await User.find();
    res.json({ statusCode: 200, body: users });
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:authId", cors(corsOptions), async (req, res) => {
  try {
    const specUser = await User.findOne({ authId: req.params.authId });
    res.json({ statusCode: 200, body: specUser });
  } catch (err) {
    res.json({ message: err });
  }
});

//retrieve full names of users' uids
router.get("/names/:uids", cors(corsOptions), async (req, res) => {
  try {
    const uidList = req.params.uids.split("&");
    const userNames = await User.find({
      _id: { $in: uidList },
    }).select(["fname", "lname"]);
    res.json({ statusCode: 200, body: userNames });
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/post", cors(corsOptions), async (req, res) => {
  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    authId: req.body.authId,
  });

  const savedUser = await user.save();
  try {
    res.json({ statusCode: 201, body: savedUser });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

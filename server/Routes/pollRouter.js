const express = require("express");
const router = express.Router();
const Poll = require("../Models/Poll");

router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const specPoll = await Poll.findById(req.param._id);
    res.json(specPoll);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/post", async (req, res) => {
  const newPoll = new Poll({
    pollName: req.body.pollName,
    details: req.body.details,
    rsvpDate: req.body.rsvpDate,
    pollType: req.body.pollType,
    authId: req.body.authId,
  });

  const savedPoll = await newPoll.save();
  try {
    res.json(savedPoll);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

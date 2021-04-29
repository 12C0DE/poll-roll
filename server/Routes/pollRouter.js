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

//retrieve poll names
router.get("/pollnames/:authId", async (req, res) => {
  try {
    const pollNames = await Poll.find({ authId: req.params.authId }).select(
      "pollName"
    );
    res.json(pollNames);
  } catch (err) {
    res.json({ message: err });
  }
});

//retrieve specific poll
router.get("/:_id", async (req, res) => {
  try {
    const specPoll = await Poll.findById(req.params._id);
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
    pollOptions: req.body.pollOptions,
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

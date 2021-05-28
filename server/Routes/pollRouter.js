const { response } = require("express");
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

//retrieve user's vote for a BoolVote poll
router.get('/bool/:pollId/:uid', async (req, res) => {
  try {
    const vote = await Poll.findOne({'pollOptions.pollId': req.params.pollId}).select("pollOptions.votes");

    //do check in T[] & F[] here

    res.json(vote);
  } catch (err) {
    res.json({message: err});
  }
});

//create a poll
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

//update a specific poll
router.patch("/upd/:_id", async (req, res) => {
  try {
    const updPoll = await Poll.findOneAndUpdate(
      { _id: req.params._id },
      req.body
    );
    res.sendStatus(204);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

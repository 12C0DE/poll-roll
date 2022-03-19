const { response } = require("express");
const express = require("express");
const router = express.Router();
const Poll = require("../Models/Poll");

router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json({ statusCode: 200, body: polls });
  } catch (err) {
    res.json({ message: err });
  }
});

//retrieve poll names that user OWNS
router.get("/pollnames/:authId", async (req, res) => {
  try {
    const pollNames = await Poll.find({ authId: req.params.authId }).select([
      "pollName",
      "pollKind",
    ]);
    res.json({ statusCode: 200, body: pollNames });
  } catch (err) {
    res.json({ message: err });
  }
});

//retrieve poll names that user JUST votes in
router.get("/pollnames/:authId/:uid", async (req, res) => {
  try {
    const pollNames = await Poll.find({
      authId: { $nin: req.params.authId },
      $or: [
        { "pollOptions.votes": req.params.uid },
        { "pollOptions.votes.F": req.params.uid },
        { "pollOptions.votes.T": req.params.uid },
      ],
    }).select(["pollName", "pollKind"]);
    res.json({ statusCode: 200, body: pollNames });
  } catch (err) {
    res.json({ message: err });
  }
});

//retrieve specific poll to EDIT if you are the authID
router.get("/:_id/:authId", async (req, res) => {
  try {
    const specPoll = await Poll.findOne({
      _id: req.params._id,
      authId: req.params.authId,
    });
    res.json({ statusCode: 200, body: specPoll });
  } catch (err) {
    res.json({ message: err });
  }
});

//retrieve specific poll to VOTE
router.get("/:_id", async (req, res) => {
  try {
    const specPoll = await Poll.findById(req.params._id);
    res.json({ statusCode: 200, body: specPoll });
  } catch (err) {
    res.json({ message: err });
  }
});

//create a poll
router.post("/post", async (req, res) => {
  const newPoll = new Poll({
    pollName: req.body.pollName,
    details: req.body.details,
    rsvpDate: req.body.rsvpDate,
    pollOptions: req.body.pollOptions,
    pollKind: req.body.pollKind,
    authId: req.body.authId,
  });

  const savedPoll = await newPoll.save();
  try {
    res.json({ statusCode: 201, body: savedPoll });
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

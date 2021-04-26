const mongoose = require("mongoose");

const PollSchema = mongoose.Schema({
  pollName: { type: String, require: true },
  details: String,
  rsvpDate: Date,
  pollType: { type: [], require: true },
  authId: { type: String, require: true },
});

module.exports = mongoose.model("polls", PollSchema);

const mongoose = require("mongoose");

//schema
const UserSchema = mongoose.Schema({
  fname: String,
  lname: String,
  authId: {
    type: String,
    require: true,
    unique: true,
  },
});

module.exports = mongoose.model("users", UserSchema);

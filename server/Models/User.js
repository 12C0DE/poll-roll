const mongoose = require("mongoose");

//schema
const UserSchema = mongoose.Schema({
  fname: String,
  lname: String,
  uid: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("users", UserSchema);

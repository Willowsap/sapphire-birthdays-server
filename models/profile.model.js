const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  fname: { type: String, required: true },
  mname: { type: String, required: false },
  lname: { type: String, required: false },
  birthday: { type: String, required: true },
  about: { type: String, required: false }
});

module.exports = mongoose.model('Profile', profileSchema);

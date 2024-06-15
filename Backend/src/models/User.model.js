const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
    maxLength: 20,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 50,
  },
});

userSchema.methods.isPasswordCorrect = function (password) {
  return password === this.password;
}
module.exports = mongoose.model("User", userSchema);

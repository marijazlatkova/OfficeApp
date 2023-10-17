const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  username: {
    type: String
  },
  comment: {
    type: String
  },
  time: {
    type: Date,
    default: () => Date.now()
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "users"
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model("Post", postSchema, "OfficeApp");
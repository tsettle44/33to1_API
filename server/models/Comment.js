const mongoose = require("mongoose");
const moment = require("moment");

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a")
  },
  body: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: []
});

//Sort Posts

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "USER",
  },
  post_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  comment: {
    type: String,
    required: true,
  }
});

module.exports=mongoose.model('Comment',CommentSchema)
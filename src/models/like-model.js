const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
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
  like: {
    type: Boolean,
    required: false,
  }
});

module.exports=mongoose.model('Like',LikeSchema)
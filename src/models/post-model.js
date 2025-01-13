const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:false
    }],
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "USER",
          required: true,
        },
});

module.exports=mongoose.model('Post',PostSchema)
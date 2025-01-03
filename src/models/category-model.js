const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
});

module.exports=mongoose.model('Category',CategorySchema)
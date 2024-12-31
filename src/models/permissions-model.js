const mongoose = require('mongoose');

const PermissionsSchema = new mongoose.Schema({
  permission_name: {
    type: String,
    required: true,
  },
 is_default: {
   type: Number,
   default:0,   //0 no default ,1 default
  },
});

module.exports=mongoose.model('Permissions',PermissionsSchema)
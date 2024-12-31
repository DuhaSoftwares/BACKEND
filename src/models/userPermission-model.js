const mongoose = require('mongoose');

const userPermissionsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "USER",
  },
  Permissions:[ {
    permission_name: String,  // model route
    permission_value:[Number], //0 create,1 read,2 edit,3 Delete
  }]
});

module.exports=mongoose.model('userPermissions',userPermissionsSchema)
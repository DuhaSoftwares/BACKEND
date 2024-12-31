const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: Number,// 0>admin,1=sub-admin,2=user,3=editor
        required: true,
        default:0
    }
    
});

module.exports=mongoose.model('USER',UserSchema)
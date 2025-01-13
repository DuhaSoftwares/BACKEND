const mongoose = require('mongoose');

const licenseTypeSchema = new mongoose.Schema({
    licenseType: {
        type: ['Trial','Basic','Standard','Premium'],
        required:true
    },
    licensePrice: {
        type: Number,
        required:true
    },
    licenseDuration: {
        type: Number,
        required:true
    },
    licenseDescription: {
        type: String,
        required:true
    },
    licenseFeatures: [{
        type: String,
        required:false
    }],
    licenseModules: [{
        type: String,
        required:false
    }],
    licenseUsers: {
        type: Number,
        required:true
    },
    licenseSupport: {
        type: Boolean,
        required:true
    },
    licenseUpdates: {
        type: Boolean,
        required:true
    },
    expiration: {
        type: Date,
        required:true
    },
})

module.exports=mongoose.model('LicenseType',licenseTypeSchema)
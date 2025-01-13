const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
    TrialModules: ['dashboard','products','orders','customers'],
    BasicModules: ['dashboard','products','orders','customers','reports','integrations','settings'],
    StandardModules: ['dashboard','products','orders','customers','reports','integrations','settings','subscriptions','invoices','billing'],
    PremiumModules: ['dashboard','products','orders','customers','reports','integrations','settings','subscriptions','invoices','billing','payroll','taxes','accounting'],   
});

module.exports = mongoose.model("Module", ModuleSchema);
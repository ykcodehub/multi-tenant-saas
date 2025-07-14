const mongoose = require(`mongoose`);

const userScheme = new mongoose.Schema({
    customerId: {type: String, required:true},
    role: {type:String, enum: ["Admin", "user"], default: "user"},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    }, 
{ timestamps: true });

module.exports = mongoose.model("user", userScheme);
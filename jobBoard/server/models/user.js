const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone_number:String,
    company:String,
    hashedPassword:String,
    salt:String,
    role:String
});

module.exports = mongoose.model("user", userSchema);
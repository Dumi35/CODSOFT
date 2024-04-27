const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:String,
    hashedPassword:String,
    salt:String,
    role:String
});

module.exports = mongoose.model("user", userSchema);
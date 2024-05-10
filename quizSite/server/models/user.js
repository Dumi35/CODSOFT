const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:String,
    hashedPassword:String,
    salt:String,
});

module.exports = mongoose.model("user", userSchema);
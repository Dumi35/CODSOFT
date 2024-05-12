const mongoose = require("mongoose")

const quizSchema = mongoose.Schema({
    name:String,
    createdBy: String,
    quizDuration:String,
    questions: Array
})

module.exports = mongoose.model("quiz", quizSchema)
const mongoose = require("mongoose")

const quizSchema = mongoose.Schema({
    name:String
})

module.exports = mongoose.model("job_application", quizSchema)
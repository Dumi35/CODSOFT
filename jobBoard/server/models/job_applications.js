const mongoose = require("mongoose")

const jobApplicationsSchema = mongoose.Schema({
    full_name: String,
    email: String,
    linkedIn: String,
    job_title: String,
    company:String,
    job_poster: String,
    resume: {
        fileId:String,
        filename: String,
        contentType: String,
        length: Number
    }
})

module.exports = mongoose.model("job_application", jobApplicationsSchema)
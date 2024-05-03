const mongoose = require("mongoose")

const postedJobsSchema = mongoose.Schema({
    job_title:String,
    job_poster: String,
    company: String,
    about: String,
    minimum_requirements: String,
    bonus_if: String,
    job_type: String,
    location: String,
    salary_range:String
})

module.exports=mongoose.model("posted_job", postedJobsSchema)
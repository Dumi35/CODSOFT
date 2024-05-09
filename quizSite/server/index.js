const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())

const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

mongoose.connect("mongob://127.0.0.1:1111/").then(()=>{
    console.log("db connected")
    app.listen(SERVER_PORT, () => { console.log(`Server running on port ${SERVER_PORT}`) })
}).catch((e)=>{console.log(e)})

app.use(express.json())
app.use(express.urlencoded())

const quiz = require("./models/quiz")


const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())

const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

const SERVER_PORT = process.env.PORT || 4000

mongoose.connect("mongodb://192.168.22.106:2721/quizSite").then(()=>{
    console.log("db connected")
    app.listen(SERVER_PORT, () => { console.log(`Server running on port ${SERVER_PORT}`) })
}).catch((e)=>{console.log(e)})

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const quiz = require("./models/quiz")

const user = require("./models/user");

app.get("/signup", (req, res) => {
    const { email } = req.query

    user.aggregate([
        {
            $match: {
                email: email,
            }
        },
        {
            $project: {
                email: 1

            }
        }
    ]).then((response) => {
        return res.send(response)
    }).catch((error) => {
        console.error(error)
    })

})

app.post("/signup", (req, res) => {
    const { email, hashedPassword, salt} = req.body
    //2G5K45LA2B
    const newUser = new user({ email: email, hashedPassword, salt });
    newUser.save()
        .then(() => {
            console.log("Record saved");
            return res.send("Record saved"); // Respond to the client after saving
        })
        .catch(err => console.log(err));
})

app.get("/login", (req, res) => {
    const { email } = req.query

    user.aggregate([
        {
            $match: {
                email: email,
            }
        }
    ]).then((response) => {
        if (response.length == 0) {
            return res.status(400).send("Invalid email/password")
        } else {
            return res.send(response)
        }
    }).catch((error) => {
        console.error(error)
    })
})

const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())

const bcrypt = require("bcryptjs")

const SERVER_PORT = 4000

const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:2721/jobify").then(() => {
    console.log("connected")
    app.listen(SERVER_PORT, () => { console.log(`Server running on port ${SERVER_PORT}`) })
}).catch((error) => {
    console.log("DB conn error ", error)
})

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
        res.send(response)
    }).catch((error) => {
        console.error(error)
    })

})

app.post("/signup", (req, res) => {
    const { email, hashedPassword, salt, role } = req.body
    const newUser = new user({ email: email, hashedPassword, salt, role });

    newUser.save()
        .then(() => {
            console.log("Record saved");
            res.send("Record saved"); // Respond to the client after saving
        })
        .catch(err => console.log(err));
})

app.get("/login", (req, res) => {
    const { email} = req.query
    
    user.aggregate([
        {
            $match: {
                email: email,
            }
        }
    ]).then((response) => {
        if(response.length==0){
            res.status(400).send("Invalid email/password")
        }else{
            res.send(response)
        }
    }).catch((error) => {
        console.error(error)
    })
})
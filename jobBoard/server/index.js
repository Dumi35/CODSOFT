const express = require("express")
const app = express()

const cors = require("cors")
app.use(cors())

const bcrypt = require("bcryptjs")

const SERVER_PORT = 4000

const mongoose = require("mongoose")

//file uploading packages
const Grid = require("gridfs-stream")
//const config = require("config")
const multer = require("multer")
const { Readable } = require("stream")


//mongod --dbpath C:\Users\dumid\Desktop\CODSOFT\jobBoard\database --port 2721


mongoose.connect("mongodb://127.0.0.1:2721/jobify").then(() => {
    console.log("connected to database")
    app.listen(SERVER_PORT, () => { console.log(`Server running on port ${SERVER_PORT}`) })
}).catch((error) => {
    console.log("DB conn error ", error)
})

let connection = mongoose.connection

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
    //2G5K45LA2B
    const newUser = new user({ name: "", email: email, phone_number: "", company: "", hashedPassword, salt, role });
    newUser.save()
        .then(() => {
            console.log("Record saved");
            res.send("Record saved"); // Respond to the client after saving
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
            res.status(400).send("Invalid email/password")
        } else {
            res.send(response)
        }
    }).catch((error) => {
        console.error(error)
    })
})

const postedJob = require("./models/posted_jobs")

app.get("/searchJobs", (req, res) => {
    postedJob.find({}).then((response) => {
        res.send(response)
    }).catch((e) => { console.log(e) })
})


const jobApplication = require("./models/job_applications")
const nodemailer = require("nodemailer")
connection.on("open", () => {
    let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db)

    const storage = multer.memoryStorage()
    const upload = multer({ storage })

    app.post("/apply", upload.single("resume"), async (req, res) => {

        let { full_name, email, linkedIn_profile, job_title, company, job_poster } = req.body

        let { fieldname, originalname, mimetype, buffer } = req.file

        try {

            let uploadStream = bucket.openUploadStream(fieldname)
            let readBuffer = new Readable()
            readBuffer.push(buffer)
            readBuffer.push(null)

            let job_application = new jobApplication({
                full_name: full_name,
                email: email,
                linkedIn: linkedIn_profile,
                job_title: job_title,
                company: company,
                job_poster: job_poster,
                resume: {
                    fileId: uploadStream.id,
                    originalname,
                    contentType: mimetype,
                    length: buffer.length
                }
            })

            const isUploaded = await new Promise((resolve, reject) => {
                readBuffer.pipe(uploadStream)
                    .on("finish", resolve("successfull"))
                    .on("error", reject("error occured while creating stream"))
            })
            console.log("file upload: ", isUploaded)

            let savedFile = await job_application.save()
            if (!savedFile) {
                console.log("error saving file")
                return res.status(404).send("error occured while saving our work")
            }

            let transporter = nodemailer.createTransport({
                service: 'gmail', // Use your email provider
                auth: {
                    user: 'dumebi328@gmail.com',
                    pass: 'utpa ueby rmea bvmd'
                }
            });

            let mailOptions = {
                from: 'dumebi328@gmail.com',
                to: email,
                subject: `Succesful Application: ${job_title} Position`,
                text: `Dear ${full_name}, \n
We hope this email finds you well.\n
We wish to inform you that your application for the role of ${job_title} at ${company} has been successfully submitted through our job board website.\n
Your application is now in the hands of the hiring team at ${company}, and they will review it according to their recruitment process.\n
Thank you for using our platform to apply for this opportunity. We wish you the best of luck with your application.
\n
Best Regards,\n
Jobify
                `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.send(error)
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            return res.send({ file: savedFile, message: "file uploaded successfully" })
        } catch (err) {
            res.send("error uploading file")
        }
    })

    // app.get("/image/:fileId", (req, res)=>{
    //     let {fileId} = req.params

    //     let downloadStream = bucket.openDownloadStream( new mongoose.Types.ObjectId(fileId))

    //     downloadStream.on("file", (file)=>{
    //         res.set("Content-Type", file.contentType)
    //     })

    //     downloadStream.pipe(res)
    // })
})

app.get("/load-profile", (req, res) => {
    let { email } = req.query

    user.aggregate([
        {
            $match:{
                email:email
            }
        },
        {
            $project:{
                name:1,
                email:1,
                company:1,
                phone_number:1
            }
        }
    ]).then((response) => {
        res.send(response)
    }).catch((e) => {
        console.log(e)
    })
})

//edit profile
app.post("/edit-profile", (req, res) => {
    let { name, email, company, phone_number, user_email } = req.body
    console.log(user_email)
    user.updateOne({ email: user_email }, {
        $set: {
            name: name,
            email: email,
            phone_number:phone_number,
            company: company
        }
    }).then((response) => {
        console.log("updated")
    }).catch((e) => {
        console.log(e)
    })
})

const express = require("express")
const router = express.Router()
const Usermodel = require("../model/user_model")
const PostModel = require("../model/postmodel")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config()
const jwtsecretkey = process.env.jwt_secret


//log in api implimentation
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: "email and password mandatory" })
    }
    let user = await Usermodel.find({ email: email })
    console.log(user[0].password)

    if (!user) {  // if user not found
        return res.status(400).json({ error: "user does not exist" })

    }

    //if user already exist  then compare the password 
    bcrypt.compare(password, user[0].password, function (err, result) {   // user.password-->hashpassword in the db
        if (err) {
            console.log(err.message)
            return res.status(500).json({
                status: "failed",
                message: err.message
            })
        }
        if (result) {
            //create token after login
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: user[0]._id
            }, jwtsecretkey);
            const {_id, fullname, email} =user[0]

            return res.json({
                status: "success",
                message: "Login success",
                userinfo: {_id, fullname, email},
                token
            })
        }
        else {
            return res.json({
                status: "failed",
                message: "Invalid Credentials"
            })
        }
    });
})

// register api implementation
router.post("/register", async (req, res) => {
    console.log(req.body)
    const { fullname, email, password } = req.body  //object destructuring
    if (!fullname || !email || !password) {
        return res.status(400).json({error: "one or more mandatory field is empty" })
    }

    //avoid duplicate users
    let Userexist = await Usermodel.findOne({ email: email })
    if (Userexist) {
        return res.status(500).json({ error: "User with this email already exist" })
    }

    // hashing the password and store the userdata in the DB.
    bcrypt.hash(password, 10, async (err, hashpassword) => {
        if (err) {
            return res.json({
                status: "failed",
                error: err.message``
            })

        }
        const user = await Usermodel.create({ fullname, email, password: hashpassword })
        console.log(password)
        user.save()  //save()--> for saving data in the db
            .then(() => {
                return res.status(201).json({ status: "User Registered successfully" })

            })
            .catch((err) => {
                console.log(err)
            })
    });

})

module.exports = router
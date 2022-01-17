const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
// const dotenv = require('dotenv');
// dotenv.config()
// const SECRET = process.env.SECRET;
const HOST = "smtp.gmail.com";
const PORT = 465;
const USER = "neostore.suppor2022@gmail.com";
const PASS = "NeoStore@2022";
const SECRET = "23c48bfc26bd4f6347b0dece088eb463";

const User = require('../models/User');

const register = async (req, res) => {
    const { first_name, last_name, phone, email, gender, password, cpassword } = req.body
    try {
        console.log(first_name, last_name, phone, email, gender, password, cpassword);
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exist" })
        if (password !== cpassword) return res.status(400).json({ message: "Password don't match" })
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log(hashedPassword);
        const result = await User.create({ first_name, last_name, phone, email, password: hashedPassword, gender })
        console.log(result);
        const token = jwt.sign({ email: result.email, id: result._id }, SECRET, { expiresIn: "1h" })
        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET, { expiresIn: "1h" })
        res.status(200).json({ message: "You have logged In", result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const forgotPassword = (req, res) => {
    const { email } = req.body
    // NODEMAILER
    const transporter = nodemailer.createTransport({
        host: HOST,
        port: PORT,
        secure: true,
        auth: { user: USER, pass: PASS },
        tls: { rejectUnauthorized: false }
    });


    // crypto.randomBytes(8, (err, buffer) => {
    crypto.randomInt((100000, 999999), (err, buffer) => {
        if (err) {
            console.log(err)
        }
        // const token = buffer.toString("hex");
        const token = buffer;
        User.findOne({ email: email })
            .then(user => {
                if (!user) { return res.status(422).json({ error: "User does not exist in our database" }); }
                user.resetToken = token
                user.expireToken = Date.now() + 3600000
                user.save().then((result) => {
                    // transporter.sendMail({
                    //     to: user.email,
                    //     from: "neostore.suppor2022@gmail.com",
                    //     subject: "Password reset request",
                    //     html:
                    //         `<h2>Password Reset Request</h2>
                    //     <h3>You have requested for a password reset. </h3>
                    //     <h3>Your Token for Password Reset Request for NeoSTORE is <span style="color: red;">${token}</span> .</h3>
                    //     <p>https://localhost:3000/reset/${token}</p>
                    //     <p>If this was a mistake, just ignore this email and nothing will happen.</p>`,
                    //     text: `Your Reset Token for NeoStore is ${token} .`
                    // });
                    res.json({ message: "Email Sent" })
                }).catch((err) => console.log(err))

            })
    })
}

const resetPassword = (req, res) => {
    const npassword = req.body.password;
    const cnpassword = req.body.cpassword;
    const sentToken = req.body.token;

    User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
        .then(user => {
            if (!user) return res.status(422).json({ error: "Try again session expired" });
            if (npassword !== cnpassword) return res.status(400).json({ message: "Password don't match" });
            bcrypt.hash(npassword, 12).then(hashedpassword => {
                user.password = hashedpassword
                user.resetToken = undefined
                user.expireToken = undefined
                user.save().then((saveduser) => {
                    res.json({ message: "password updated success" });
                });
            });
        }).catch(err => {
            console.log(err);
        });
}

module.exports = { login, register, forgotPassword, resetPassword };
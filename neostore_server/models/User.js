const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    first_name: { type: String, min: 3, max: 25, required: true },
    last_name: { type: String, min: 3, max: 25, required: true },
    email: { type: String, max: 25, required: true, unique: true },
    password: { type: String, required: true, default: "social login" },
    phone: { type: String, unique: true },
    profilepicture: { type: String, default: "newprofile.jpg" },
    gender: { type: String, default: "" },
    orders: { type: Array },
    addresses: { type: Array },
    cart: { type: Array },
    verified: { type: Boolean, default: false },
    accountType: { type: String },
    isadmin: { type: Boolean, default: false },
    resetToken: { type: String, default: "" },
    expireToken: { type: Date, default: "" },
},
    { timestamps: true }
);
const User = mongoose.model('User', userSchema);
module.exports = User;
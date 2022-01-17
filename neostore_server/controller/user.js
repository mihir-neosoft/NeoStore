const User = require('../models/User');
const mongoose = require('mongoose');

const getallusers = async (req, res) => {
    try {
        const allusers = await User.find().sort({ _id: -1 });
        res.status(200).json(allusers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const getuser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const updateuser = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, phone, email, gender, password, cpassword } = req.body
    try {
        console.log(id, first_name, last_name, phone, email, gender, password, cpassword);
        res.status(200).json({ id, first_name, last_name, phone, email, gender, password, cpassword })
    } catch (error) {

    }
}
const deleteuser = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
    } catch (error) {

    }
}
const addaddress = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
    } catch (error) {

    }
}
const getalladdress = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
    } catch (error) {

    }
}
const getaddress = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
    } catch (error) {

    }
}
const updateaddress = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
    } catch (error) {

    }
}
const deleteaddress = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
    } catch (error) {

    }
}

module.exports = { getallusers, getuser, updateuser, deleteuser, addaddress, getalladdress, getaddress, updateaddress, deleteaddress };
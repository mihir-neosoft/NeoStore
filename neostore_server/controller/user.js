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
    const address = req.body;
    try {
        // console.log(req.body, id);
        await User.findOneAndUpdate({ _id: id }, { $push: { addresses: address } });
        res.status(200).json({ message: "Address Added" });
    } catch (error) {
        res.status(500).json({ error });
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
// cart
// add to cart 
const addtocart = async (req, res) => {
    const { id } = req.params;
    const cart = req.body
    console.log(cart);
    console.log(id);
    try {
        // console.log(req.body, id);
        await User.findOneAndUpdate({ _id: id }, { cart: cart });
        res.status(200).json({ message: "Added to cart" });
    } catch (error) {
        res.status(500).json({ error });
    }
}
const getcart = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        // console.log(req.body, id);
        const user = await User.findOne({ _id: id });
        const cart = user.cart;
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error });
    }
}
// order
// add order 
const ordercomplete = async (req, res) => {
    const { id } = req.params;
    const order = req.body;
    // console.log(order);
    // console.log(id);
    try {
        // const user = { orders: [] }
        const user = await User.findOne({ _id: id });
        // const orderexist = user.orders.map(ele => {
        //     if (ele.order_id === order.order_id) {
        //         return true
        //     }
        // })
        await User.findOneAndUpdate({ _id: id }, { $push: { orders: order }, $set: { cart: [] } });
        res.status(200).json({ message: "Order Added" });
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = { getallusers, getuser, updateuser, deleteuser, addaddress, getaddress, updateaddress, deleteaddress, addtocart, getcart, ordercomplete };
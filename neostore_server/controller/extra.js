const Subscriber = require('../models/Subscriber');
const mongoose = require('mongoose');

const addsubscriber = async (req, res) => {
    const { subemail } = req.body;
    try {
        const existingUser = await Subscriber.findOne({ subemail });
        if (existingUser) return res.status(400).json({ message: "Already Added" })
        const result = await Subscriber.create({ subemail })
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = { addsubscriber };
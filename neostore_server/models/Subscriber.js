const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    subemail: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Subscriber", subscriberSchema);
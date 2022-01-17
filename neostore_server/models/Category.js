const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    category_name: { type: String, required: true, unique: true },
    category_description: { type: String },
    category_label: { type: String },
    category_value: { type: String },
    category_image: { type: String },
},
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema)
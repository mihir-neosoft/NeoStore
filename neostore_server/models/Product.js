const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: { type: String, required: true, unique: true },
    product_image: { type: String, required: true, default: "1.jpg" },
    product_description: { type: String, required: true },
    product_subimages: ["2.jpg", "3.jpg", "4.jpg"],
    product_cost: { type: Number, required: true },
    product_rating: { type: Number },
    product_rating_count: { type: Number },
    color_id: { type: mongoose.Schema.Types.ObjectId, ref: "Color" },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
},
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
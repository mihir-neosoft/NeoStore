const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Color = require('../models/Color');

// add new color
const addcolor = async (req, res) => {
    const { color_name, color_code } = req.body;
    try {
        console.log(color_name, color_code);
        const existingColor = await Color.findOne({ color_name });
        if (existingColor) return res.status(400).json({ message: "Color already exist" });
        const result = await Color.create({ color_name, color_code });
        console.log(result);
        res.status(200).json({ result })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const getallcolor = async (req, res) => {
    try {
        const allcolor = await Color.find().sort({ _id: -1 });
        res.status(200).json(allcolor);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// add new category
const addcategory = async (req, res) => {
    const { category_name, category_description, category_label, category_value, category_image } = req.body;
    try {
        console.log(category_name, category_description, category_label, category_value, category_image);
        const existingCategoy = await Category.findOne({ category_value });
        if (existingCategoy) return res.status(400).json({ message: "Category already exist" });
        const result = await Category.create({ category_name, category_description, category_label, category_value, category_image });
        console.log(result);
        res.status(200).json({ result })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const getallcategory = async (req, res) => {
    try {
        const allcategory = await Category.find().sort({ _id: -1 });
        res.status(200).json(allcategory);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// get all products
const getallproducts = async (req, res) => {
    try {
        console.log("get all products");
        const allproducts = await Product.find().populate(["color_id", "category_id"]).sort({ _id: -1 });
        res.status(200).json(allproducts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// get products by category
const getproductsbycategory = async (req, res) => {
    try {
        console.log("get products by category");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// get products by color
const getproductsbycolor = async (req, res) => {
    try {
        console.log("get products by color");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// get products by name
const getproductsbyname = async (req, res) => {
    try {
        console.log("get products by name");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// single product routes
// get product
const getproduct = async (req, res) => {
    try {
        console.log("get product");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// create new product
const addproduct = async (req, res) => {
    const { product_name, product_image, product_description, product_subimages, product_cost, product_rating, product_rating_count, color_id, category_id } = req.body;
    try {
        console.log(product_name, product_image, product_description, product_subimages, product_cost, product_rating, product_rating_count, color_id, category_id);
        const existingProduct = await Product.findOne({ product_name });
        if (existingProduct) return res.status(400).json({ message: "Product already exist" });
        const result = await Product.create({ product_name, product_image, product_description, product_subimages, product_cost, product_rating, product_rating_count, color_id, category_id });
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// update product
const updateproduct = async (req, res) => {
    try {
        console.log("update product");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// delete product
const deleteproduct = async (req, res) => {
    try {
        console.log("delete product");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getallproducts, getproductsbycategory, getproductsbycolor, getproductsbyname, getproduct, addproduct, updateproduct, deleteproduct, addcolor, getallcolor, addcategory, getallcategory };
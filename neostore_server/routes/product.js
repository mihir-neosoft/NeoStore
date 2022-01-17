const express = require('express');
const router = express.Router();
const { getallproducts, getproductsbycategory, getproductsbycolor, getproductsbyname, getproduct, addproduct, updateproduct, deleteproduct, addcolor, getallcolor, addcategory, getallcategory } = require('../controller/product');

// populate db with color and category.
router.post('/addcolor', addcolor);
router.get('/getallcolor', getallcolor);
router.post('/addcategory', addcategory);
router.get('/getallcategory', getallcategory);
// Products
router.post('/addproduct', addproduct);
router.get('/getallproducts', getallproducts);


router.get('/category/:category', getproductsbycategory);
router.get('/color/:color', getproductsbycolor);
router.get('/name/:name', getproductsbyname);


router.get('/:id', getproduct);
router.post('/:id/addproduct', addproduct);
router.put('/:id/updateproduct', updateproduct);
router.delete('/:id/deleteproduct', deleteproduct);



module.exports = router;
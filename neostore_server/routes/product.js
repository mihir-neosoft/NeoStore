const express = require('express');
const router = express.Router();
const { getallproducts, getproductsbycategory, getproductsbycolor, getproductsbyname, getproduct, addproduct, updateproduct, deleteproduct, addcolor, getallcolor, addcategory, getallcategory, filterproduct } = require('../controller/product');

// populate db with color and category.
router.post('/addcolor', addcolor);
router.get('/getallcolor', getallcolor);
router.post('/addcategory', addcategory);
router.get('/getallcategory', getallcategory);
// Products
router.post('/addproduct', addproduct);
router.get('/getallproducts', getallproducts);
router.post('/filterproduct', filterproduct);
router.get('/productdetails/:id', getproduct);


router.get('/category/:category', getproductsbycategory);
router.get('/color/:color', getproductsbycolor);
router.get('/name/:name', getproductsbyname);


router.post('/:id/addproduct', addproduct);
router.put('/:id/updateproduct', updateproduct);
router.delete('/:id/deleteproduct', deleteproduct);



module.exports = router;
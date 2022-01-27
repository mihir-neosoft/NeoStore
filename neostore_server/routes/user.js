const express = require('express');
const router = express.Router();
const { getallusers, getuser, updateuser, deleteuser, addaddress, getaddress, updateaddress, deleteaddress, addtocart, getcart, ordercomplete } = require('../controller/user');

// user Profile routes
// get all user profiles only if admin.
router.get('/', getallusers);
// get user profile
router.get('/:id', getuser);
// update user profile
router.put('/:id', updateuser);
// delete user profile only if admin.
router.delete('/:id', deleteuser);

// address routes
//create new user address.
router.post("/address/:id/addaddress", addaddress);
// get user address
router.get('/address/:id/address/:address', getaddress);
// update user address
router.put('/address/:id/address/:address/update', updateaddress);
// delete user address
router.delete('/address/:id/address/:address/delete', deleteaddress);

// cart
// add to cart
router.post("/cart/addtocart/:id", addtocart);
// add to cart
router.get("/cart/getcart/:id", getcart);

// orders
// add to cart
router.post("/order/ordercomplete/:id", ordercomplete);

module.exports = router;
const express = require('express');
const router = express.Router();
const { getallusers, getuser, updateuser, deleteuser, addaddress, getalladdress, getaddress, updateaddress, deleteaddress } = require('../controller/user');

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
router.post("/:id/addaddress", addaddress);
// get all user addresses
router.get('/:id/address', getalladdress);
// get user address
router.get('/:id/address/:address', getaddress);
// update user address
router.put('/:id/address/:address/update', updateaddress);
// delete user address
router.delete('/:id/address/:address/delete', deleteaddress);


module.exports = router;
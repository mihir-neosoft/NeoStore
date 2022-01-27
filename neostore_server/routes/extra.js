const express = require('express');
const router = express.Router();
const { addsubscriber } = require('../controller/extra');


router.post("/addsubscriber", addsubscriber);


module.exports = router;
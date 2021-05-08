const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

// the order of middleware matters
// whether I call next() or not matters as well
router.get('/add-book', adminController.getAddBook);

router.post('/book', adminController.postAddBook);


exports.routes = router;
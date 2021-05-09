const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

// the order of middleware matters
// whether I call next() or not matters as well

router.get('/products', adminController.getProducts);

router.get('/add-product', adminController.addProduct);

router.post('/products', adminController.postAddProduct);

router.get('/products/:productId', adminController.getOneProduct); // this is dynamic 


exports.routes = router;
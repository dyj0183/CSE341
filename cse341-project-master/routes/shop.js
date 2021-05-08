const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

// the order of middleware matters
router.get('/products', shopController.getProducts);
router.get('/cart');
router.get('/checkout');
router.get('/', shopController.getIndex);


//router.post('/book', productsController.postAddBook);
exports.routes = router;
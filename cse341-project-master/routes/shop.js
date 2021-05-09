const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

// the order of middleware matters
//router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getOneProduct); // this is dynamic 
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);
router.get('/', shopController.getIndex);


//router.post('/book', productsController.postAddBook);
exports.routes = router;
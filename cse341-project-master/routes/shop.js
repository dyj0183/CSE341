const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

// router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// router.post('/create-order', shopController.postOrder);

// router.get('/orders', shopController.getOrders);

module.exports = router;



// const express = require('express');

// const router = express.Router();

// const shopController = require('../controllers/shop');

// // the order of middleware matters
// //router.get('/products', shopController.getProducts);
// router.get('/products/:productId', shopController.getOneProduct); // this is dynamic 
// router.get('/cart', shopController.getCart);
// router.get('/checkout', shopController.getCheckout);
// router.get('/', shopController.getIndex);


// //router.post('/book', productsController.postAddBook);
// exports.routes = router;
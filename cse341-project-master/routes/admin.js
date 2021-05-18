const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;



// const express = require('express');

// const router = express.Router();

// const adminController = require('../controllers/admin');

// // the order of middleware matters
// // whether I call next() or not matters as well

// router.get('/products', adminController.getProducts);

// router.get('/add-product', adminController.addProduct);

// router.post('/products', adminController.postAddProduct);

// router.get('/products/:productId', adminController.getOneProduct); // this is dynamic 


// exports.routes = router;
const Product = require('../models/product'); // import the "Product" class

exports.getProducts = (req, res, next) => {
    // const product = new Product(req.body.title, req.body.summary);
    // product.save();

    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            allProducts: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            allProducts: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart'
    })
}
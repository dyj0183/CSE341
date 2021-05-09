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

exports.getOneProduct = (req, res, next) => {
    const productId = req.params.productId; // extract the product id from the url, we use "productId" here cause that is the name we use in the router
    Product.findById(productId, product => {
        console.log("This is the matched product: ");
        console.log(product);

        res.render('shops/one-product', {
            product: product,
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

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path:'/checkout',
    })
}
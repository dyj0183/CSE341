const Product = require('../models/product'); // import the "Product" class

exports.addProduct = (req, res, next) => {
    res.render('admin/add-product');
    //res.send('<form action="/book" method="POST"><input type="text" name="title"><button type="submit">Submit A Book</button></form>');
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description);

    product
    .save() // save() method returns a promise
    .then(result => {
        consolo.log("Created a new product");
        res.redirect('/products');
    })
    .catch((err => {
        console.log(err);
    }));

    Product.fetchAll((products) => {
        res.render('shop/product-list', { allProducts: products });
    });
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            allProducts: products,
            pageTitle: 'Admin Products',
            path: '/products'
        });
    });
}

exports.getOneProduct = (req, res, next) => {
    const productId = req.params.productId; // extract the product id from the url, we use "productId" here cause that is the name we use in the router
    Product.findById(productId, product => {
        console.log("This is the matched product: ");
        console.log(product);

        res.render('shop/one-product', {
            product: product,
        });
    });
}
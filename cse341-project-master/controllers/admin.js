const Product = require('../models/product'); // import the "Product" class

exports.getAddBook = (req, res, next) => {
    res.render('admin/add-product');
    //res.send('<form action="/book" method="POST"><input type="text" name="title"><button type="submit">Submit A Book</button></form>');
}

exports.postAddBook = (req, res, next) => {
    const product = new Product(req.body.title, req.body.summary);
    product.save();

    Product.fetchAll((products) => {
        res.render('shop/product-list', { allProducts: products });
    });
}
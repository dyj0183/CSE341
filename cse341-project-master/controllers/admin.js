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
        //res.redirect('/products'); 
    })
    .catch((err => {
        console.log(err);
    }));

    Product.fetchAll
    .then((products) => {
        res.render('shop/product-list', { allProducts: products });
    })
    .catch((err) => {
        console.log(err);
    })
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll
    .then(products => {
        res.render('admin/products', {
            allProducts: products,
            pageTitle: 'Admin Products',
            path: '/products'
        });
    })
    .catch(err => console.log(err));
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

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const productId = req.params.productId;
    Product.findById(productId)
    .then(product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
    .catch(err => console.log(err));
}
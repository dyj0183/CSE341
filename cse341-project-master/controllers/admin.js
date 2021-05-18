const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
    });
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
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
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;
            return product.save();
        })
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.find()
        // .select('title price -_id')
        // .populate('userId', 'name')
        .then(products => {
            console.log(products);
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByIdAndRemove(prodId)
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};



// const Product = require('../models/product'); // import the "Product" class

// exports.addProduct = (req, res, next) => {
//     res.render('admin/add-product');
//     //res.send('<form action="/book" method="POST"><input type="text" name="title"><button type="submit">Submit A Book</button></form>');
// }

// exports.postAddProduct = (req, res, next) => {
//     const product = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description);

//     product
//     .save() // save() method returns a promise
//     .then(result => {
//         consolo.log("Created a new product");
//         //res.redirect('/products'); 
//     })
//     .catch((err => {
//         console.log(err);
//     }));

//     Product.fetchAll
//     .then((products) => {
//         res.render('shop/product-list', { allProducts: products });
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// }

// exports.getProducts = (req, res, next) => {
//     Product.fetchAll
//     .then(products => {
//         res.render('admin/products', {
//             allProducts: products,
//             pageTitle: 'Admin Products',
//             path: '/products'
//         });
//     })
//     .catch(err => console.log(err));
// }

// exports.getOneProduct = (req, res, next) => {
//     const productId = req.params.productId; // extract the product id from the url, we use "productId" here cause that is the name we use in the router
//     Product.findById(productId, product => {
//         console.log("This is the matched product: ");
//         console.log(product);

//         res.render('shop/one-product', {
//             product: product,
//         });
//     });
// }

// exports.getEditProduct = (req, res, next) => {
//     const editMode = req.query.edit;
//     if (!editMode) {
//         return res.redirect('/');
//     }
//     const productId = req.params.productId;
//     Product.findById(productId)
//     .then(product => {
//         if (!product) {
//             return res.redirect('/');
//         }
//         res.render('admin/edit-product', {
//             pageTitle: 'Edit Product',
//             path: '/admin/edit-product',
//             editing: editMode,
//             product: product
//         });
//     })
//     .catch(err => console.log(err));
// }
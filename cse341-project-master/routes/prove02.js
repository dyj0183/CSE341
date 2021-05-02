const express = require('express');

const router = express.Router();

const products = [];

// the order of middleware matters
// whether I call next() or not matters as well
router.get('/add-book', (req, res, next) => {
    res.render('prove02Form');
    //res.send('<form action="/book" method="POST"><input type="text" name="title"><button type="submit">Submit A Book</button></form>');
})

router.post('/book', (req, res, next) => {
    console.log(req.body);
    products.push({
        title: req.body.title,
        summary: req.body.summary
    });
    res.render('prove02Result', { allProducts: products });
    //res.send("<h1>Thank you for submitting the form.</h1>");
    //res.redirect("/");
});

// router.use('/', (req, res, next) => {
//     console.log("my / middleware.");
//     res.send("<h1>Hello / middleware</h1>");
//     //next();
// });

//module.exports = router;
exports.routes = router;
exports.products = products;
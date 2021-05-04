const products = [];

exports.getAddBook = (req, res, next) => {
    res.render('prove02Form');
    //res.send('<form action="/book" method="POST"><input type="text" name="title"><button type="submit">Submit A Book</button></form>');
}

exports.postAddBook = (req, res, next) => {
    console.log(req.body);
    products.push({
        title: req.body.title,
        summary: req.body.summary
    });
    res.render('prove02Result', { allProducts: products });
    //res.send("<h1>Thank you for submitting the form.</h1>");
    //res.redirect("/");
}
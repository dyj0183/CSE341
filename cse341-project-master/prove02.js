//const http = require('http'); // global module provided by nodejs

const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// include routes & products
const prove02Data = require('./routes/prove02');

// for newer version in nodejs, I need to use "express.urlencoded" instead of "bodyParser.urlencoded"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(prove02Data.routes); // use the "router" from "routes folder's prove02.js"

app.use((req, res, next) => {
    res.status(404).render('prove02404', { pageTitle: 'Page Not Found!!!'});
})

app.listen(3000);

//const server = http.createServer(app); // this function will be called whenver a request reaches the server; http.createServer returns a server, so we store it into a const
//server.listen(3000); // nodejs will listen for a incoming request
const fs = require('fs'); // import file module to read and write files
const path = require('path');

const mongodb = require('mongodb');
const getDb = require("../util/database").getDb;

// cause we use path.join(), it will work on all the operating systems including windows and linux link to the data foler
const myPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = cb => {
    fs.readFile(myPath, (err, fileContent) => {
        if (err) {
            cb([]); // return empty array 
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {

    constructor(newTitle, newImageUrl, newPrice, newDescription) {
        this.title = newTitle;
        this.imageUrl = newImageUrl;
        this.price = newPrice;
        this.description = newDescription;
    }

    // new save method for mongoDB
    save() {
        const db = getDb();
        return db.collection('products')
            .insertOne(this) // we connect to a "products" collection, insert one object which is "this", returns a promise
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    // fetch data from mongoDB
    static fetchAll() {
        const db = getDb();
        // find() returns a cursor
        return db.collection("products")
            .find()
            .toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            });
    }

    // only find documents I want 
    static findById(productId) {
        const db = getDb();
        return db.collection("products")
            .find({_id: new mongodb.ObjectId(productId)}) // mongodb uses special object type for the id
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => {
                console.log(err);
            })
    }

    /* The codes below are used to work with local file */
    // save() {
    //     this.id = (Math.floor(Math.random() * 100)).toString(); // create an ID for each object, this will be unique in the future

    //     fs.readFile(myPath, (err, fileContent) => {
    //         let products = [];

    //         if (!err) {
    //             //console.log(fileContent);
    //             products = JSON.parse(fileContent); // parse the json format to javascript object
    //         }

    //         products.push(this);

    //         fs.writeFile(myPath, JSON.stringify(products), (err) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 console.log("File written successfully.");
    //             }
    //         });
    //     })
    // }

    // console.log(err + "No data in the file.");

    // static fetchAll(callback) {
    //     // (err, fileContent) won't return back to the fetch all function, it will only return back to the inner functoin, 
    //     // so we will need to pass the "callback" function in and send the data back (see MVC chapter "fetching data from files via the model" for more info) 
    //     fs.readFile(myPath, (err, fileContent) => {
    //         if (err) {
    //             callback([]);
    //         }

    //         console.log('Read file successfully!');
    //         callback(JSON.parse(fileContent));
    //     });
    // }

    // static findById(id, cb) {
    //     getProductsFromFile((products) => {
    //         const product = products.find(p => p.id === id); // use "find()" which will return the specific product that matched the id
    //         cb(product); 
    //     });
    // }
}
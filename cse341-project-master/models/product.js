const fs = require('fs'); // import file module to read and write files
const path = require('path');

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

    save() {
        this.id = (Math.floor(Math.random() * 100)).toString(); // create an ID for each object, this will be unique in the future

        fs.readFile(myPath, (err, fileContent) => {
            let products = [];

            if (!err) {
                //console.log(fileContent);
                products = JSON.parse(fileContent); // parse the json format to javascript object
            }

            products.push(this);

            fs.writeFile(myPath, JSON.stringify(products), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("File written successfully.");
                }
            });
        })
    }

    // console.log(err + "No data in the file.");

    static fetchAll(callback) {
        // (err, fileContent) won't return back to the fetch all function, it will only return back to the inner functoin, 
        // so we will need to pass the "callback" function in and send the data back (see MVC chapter "fetching data from files via the model" for more info) 
        fs.readFile(myPath, (err, fileContent) => {
            if (err) {
                callback([]);
            }

            console.log('Read file successfully!');
            callback(JSON.parse(fileContent));
        });
    }

    static findById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find(p => p.id === id); // use "find()" which will return the specific product that matched the id
            cb(product); 
        });
    }
}
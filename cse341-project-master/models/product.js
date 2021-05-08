const fs = require('fs'); // import file module to read and write files
const path = require('path');

module.exports = class Product {

    constructor(newTitle, newSummary) {
        this.title = newTitle;
        this.summary = newSummary;
    }

    save() {
        //products.push(this);

        // cause we use path.join(), it will work on all the operating systems including windows and linux
        // link to the data foler
        const myPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

        fs.readFile(myPath, (err, fileContent) => {
            let products = [];

            if (!err) {
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
        const myPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

        // (err, fileContent) won't return back to the fetch all function, it will only return back to the inner functoin, 
        // so we will need to pass the "callback" function in and send the data back (see MVC chapter "fetching data from files via the model" for more info) 
        fs.readFile(myPath, (err, fileContent) => {
            if (err) {
                //console.log(err);
                callback([]);
            }

            callback(JSON.parse(fileContent));
        });
    }
}
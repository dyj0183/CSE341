const mongoose = require('mongoose'); // import mongoose library

const Schema = mongoose.Schema; // use to set up schema

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: { // each product should have a user who purchased it
        type: Schema.Types.ObjectId,
        ref: 'User', // refer to the User model
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema); // export the Product model for the whole project to use


// // cause we use path.join(), it will work on all the operating systems including windows and linux link to the data foler
// const myPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

// const getProductsFromFile = cb => {
//     fs.readFile(myPath, (err, fileContent) => {
//         if (err) {
//             cb([]); // return empty array 
//         } else {
//             cb(JSON.parse(fileContent));
//         }
//     });
// };

// module.exports = class Product {

//     constructor(newTitle, newImageUrl, newPrice, newDescription) {
//         this.title = newTitle;
//         this.imageUrl = newImageUrl;
//         this.price = newPrice;
//         this.description = newDescription;
//     }

//     // new save method for mongoDB
//     save() {
//         const db = getDb();
//         return db.collection('products')
//             .insertOne(this) // we connect to a "products" collection, insert one object which is "this", returns a promise
//             .then(result => {
//                 console.log(result);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     // fetch data from mongoDB
//     static fetchAll() {
//         const db = getDb();
//         // find() returns a cursor
//         return db.collection("products")
//             .find()
//             .toArray()
//             .then(products => {
//                 console.log(products);
//                 return products;
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     // only find documents I want 
//     static findById(productId) {
//         const db = getDb();
//         return db.collection("products")
//             .find({_id: new mongodb.ObjectId(productId)}) // mongodb uses special object type for the id
//             .next()
//             .then(product => {
//                 console.log(product);
//                 return product;
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
// }
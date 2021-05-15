const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    // create connection to the mongodb, returns a promise
    MongoClient.connect("mongodb+srv://Jamal:@123456abc@cluster0.evuqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        .then(client => {
            console.log('Connected!');

            // the url above will decide which database we connect to, now connects to the "myFirstDatabase" database
            // store the connection to the database
            _db = client.db(); 

            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db; // return the connection to the database
    }
    throw "no database found!";
}


//module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
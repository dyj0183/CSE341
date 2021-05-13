const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {

    // create connection to the mongodb, returns a promise
    MongoClient.connect("mongodb+srv://Jamal:@123456abc@cluster0.evuqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        .then(client => {
            console.log('Connected!');
            callback(client);
        })
        .catch(err => {
            console.log(err);
        });

}

module.exports = mongoConnect;
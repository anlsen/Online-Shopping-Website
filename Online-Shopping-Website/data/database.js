const { MongoClient } = require('mongodb');

// Connection URL
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

// Database Name
const dbName = 'onlineshop';

let db;


async function connectToDatabase() {
  // Use connect method to connect to the server
  await client.connect();
  db = client.db(dbName);

}

function getDatabase(){
    return db;
}


module.exports={
    getDatabase:getDatabase,
    connectToDatabase:connectToDatabase
}
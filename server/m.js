const {MongoClient} = require('mongodb');
const url='mongodb://localhost:27017';
const databaseName="userdb";
const client= new MongoClient(url);

async function dbConnect() {

  try {
    let result = await client.connect();
    db = result.db(databaseName);
    return db.collection("info");

  } catch (err) {
    console.error(err);
  }
}

module.exports = dbConnect;
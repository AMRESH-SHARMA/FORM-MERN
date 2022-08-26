

const databaseName="userdb";
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// const {MongoClient} = require('mongodb');
// const url='mongodb://localhost:27017';
// const databaseName="userdb";
// const client= new MongoClient(url);


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

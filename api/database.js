require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB;

const dbName = process.env.DBNAME;
let db;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err);

  // Storing a reference to the database so you can use it later
  db = client.db(dbName);
  console.log(`Connected MongoDB: ${url}`);
  console.log(`Database: ${dbName}`);
});

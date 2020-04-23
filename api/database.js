require('dotenv').config();
// const MongoClient = require('mongodb').MongoClient;

// const url = process.env.MONGODB;
// const dbName = process.env.DBNAME;

// let db;

// MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//   if (err) return console.log(err);

//   // Storing a reference to the database so you can use it later
//   db = client.db(dbName);
//   console.log(`Connected MongoDB: ${url}`);
//   console.log(`Database: ${dbName}`);
// });

// class DBProcessing {
//   constructor() {}

//   logYourThing(string) {
//     console.log(string);
//   }
//   async logAllCollections() {
//     const sumOfItAll = await db.listCollections().toArray();
//     return sumOfItAll;
//   }
// }

// module.exports = new DBProcessing();

// mongoose trash

// mongoose.connect(url, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.once('open', (_) => {
//   console.log('Database connected:', url);

//   var colorSchema = new mongoose.Schema({
//     name: String,
//     timestamp: String,
//     userID: String,
//   });

//   var Color = mongoose.model('Color', colorSchema);

//   var red = new Color({ name: '255,001,001', timestamp: '123456789', userID: '1234-1234-1234-1234' });
//   var blue = new Color({ name: '001,001,255', timestamp: '123456789', userID: '1234-1234-1234-1234' });

//   // red.save(function (err, red) {
//   //   if (err) return console.error(err);
//   //   // fluffy.speak();
//   // });

//   // blue.save(function (err, blue) {
//   //   if (err) return console.error(err);
//   //   // fluffy.speak();
//   // });

//   Color.find(function (err, colors) {
//     if (err) return console.error(err);
//     console.log(colors);
//   });
// });

// db.on('error', (err) => {
//   console.error('connection error:', err);
// });

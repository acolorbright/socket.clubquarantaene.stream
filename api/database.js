require('dotenv').config();
const mongoose = require('mongoose');

const root = process.env.MONGODB;
const dbName = process.env.DBNAME;
const url = `${root}/${dbName}`;

mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', (_) => {
  console.log('Database connected:', url);

  var colorSchema = new mongoose.Schema({
    name: String,
    timestamp: String,
    userID: String,
  });

  var Color = mongoose.model('Color', colorSchema);

  var red = new Color({ name: '255,001,001', timestamp: '123456789', userID: '1234-1234-1234-1234' });
  var blue = new Color({ name: '001,001,255', timestamp: '123456789', userID: '1234-1234-1234-1234' });

  // red.save(function (err, red) {
  //   if (err) return console.error(err);
  //   // fluffy.speak();
  // });

  // blue.save(function (err, blue) {
  //   if (err) return console.error(err);
  //   // fluffy.speak();
  // });

  Color.find(function (err, colors) {
    if (err) return console.error(err);
    console.log(colors);
  });
});

db.on('error', (err) => {
  console.error('connection error:', err);
});

class DBProcessing {
  constructor() {}

  logYourThing(string) {
    console.log(string);
  }
}

module.exports = new DBProcessing();

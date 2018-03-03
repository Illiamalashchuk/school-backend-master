var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://illiamalashchuk:football.ua123@ds127536.mlab.com:27536/malashchuk-database";

MongoClient.connect(url, function(err, db) {
  if (err) {
    return console.log(err);
  }

  // Do something with db here, like inserting a record
  db.collection('notes').insertOne(
    {
      title: 'Hello Illia',
      text: 'Definitely this works!'
    },
    function (err, res) {
      if (err) {
        db.close();
        return console.log(err);
      }
      console.log('collection inserted');
      // Success
      db.close();
    }
  )
});



MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  
  db.collection('notes').findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
  
});





// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
  
//   db.collection('notes').find({}, {_id: '5a911688d9c7ed562853e908'}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
  
// });
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/baduk-api', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('MongoDb conectado com sucesso');
  }
});

mongoose.Promise = global.Promise;

module.exports = mongoose;

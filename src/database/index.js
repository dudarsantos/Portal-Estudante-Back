const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/noderest', {useNewUrlParser: true}, err => {
  if (err) throw err;
});
mongoose.Promise = global.Promise;

module.exports = mongoose;

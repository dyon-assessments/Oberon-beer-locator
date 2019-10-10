const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0-qkqlq.mongodb.net/oberon?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;

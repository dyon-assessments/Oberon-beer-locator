const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  address: String,
  city: String,
  name: String,
  open: [],
  zipcode: String,
  distance: String,
});
module.exports = productSchema;

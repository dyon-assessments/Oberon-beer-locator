const mongoose = require('mongoose');
const bierenSchema = new mongoose.Schema({
  alcohol: Number,
  brewery: String,
  keg: String,
  name: String,
  style: String,
  volume: Number,
});
module.exports = bierenSchema;

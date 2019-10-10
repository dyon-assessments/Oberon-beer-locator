const mongoose = require('./dbConnect/dbConnect');
const BierenSchema = require('./detail-schema');
const bierenModel = mongoose.model('bieren', BierenSchema, 'bieren');

module.exports = bierenModel;

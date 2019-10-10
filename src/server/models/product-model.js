const mongoose = require('./dbConnect/dbConnect');
const ProductSchema = require('./product-schema');
const brouwerijenModel = mongoose.model('brouwerijen', ProductSchema, 'brouwerijen');

module.exports = brouwerijenModel;

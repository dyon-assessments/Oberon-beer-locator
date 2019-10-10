const ProductModel = require("../models/product-model");

const addBreweryController = () => {
};

addBreweryController.postaddbrewery = (req) => {

  const query = {
    address: req.body.address,
    city: req.body.city,
    name: req.body.name,
    open:  "['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']",
    zipcode: req.body.zipcode,
  }
  const newBrewery = new ProductModel(query);
  newBrewery.save(function (err, brewery) {
    if (err) return console.error(err);
    console.log(brewery.name + ' saved to brewery collection.');
    return false;
  });

};

module.exports = addBreweryController;

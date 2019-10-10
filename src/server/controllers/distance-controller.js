const distance = require('google-distance');
const clientRedist = require('../models/redis-model');
const productModel = require('../models/product-model');

distance.apiKey = 'AIzaSyBKM1SHTqanQfExgd8Y_vncjz-98Ybad68';

const distanceController = () => {
};

distanceController.postDistance = (req, res) => {
  const searchRedisKey = 'searchRedis:locatie=' + req.body.locatie;

  return clientRedist.get(searchRedisKey, (err, result) => {
    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    } else {

      const getProductWithDistance = product => {
        return new Promise(resolve => {
          distance.get({
              origin: req.body.locatie,
              destination: ` ${product.zipcode}, ${product.address}, ${product.city}`,
            },
            function (err, data) {
              if (data !== undefined) {
                product.distance = parseFloat(data.distance);
              } else {
                console.log(`${product.address} not found`);
              }

              resolve(product);
            }
          );
        });
      };

      productModel.find({}, (err, products) => {
        const finalProducts = products.map(async product => {
          return await getProductWithDistance(product);
        });

        Promise.all(finalProducts).then(products => {
          clientRedist.setex(searchRedisKey,
            3600,
            JSON.stringify(products.sort((a, b) => a.distance - b.distance)));
          res.json(products.sort((a, b) => a.distance - b.distance));
        });

      });
    }
  });

};

module.exports = distanceController;

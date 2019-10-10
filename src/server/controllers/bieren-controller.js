const clientRedist = require("../models/redis-model");
const bierenModel = require("../models/detail-model");

const bierenController = () => {
};

bierenController.postbiren = (req, res) => {
  const searchRedisKey = 'searchbrouwer:brouwer=' + req.body.brouwer;
  return clientRedist.get(searchRedisKey, (err, result) => {
    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    } else {
      bierenModel.find({
        'brewery': req.body.brouwer,
      }, (err, products) => {
        if (err) {
          res.json({
            error: true,
            message: 'DB connection failed',
          });
          return;
        }

        clientRedist.setex(searchRedisKey, 3600, JSON.stringify(products));
        res.send(products);
      });

    }
  });
};

module.exports = bierenController;

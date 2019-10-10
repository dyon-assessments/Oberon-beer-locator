const redis = require('redis');

const clientRedist = redis.createClient();

clientRedist.on('error', (err) => {
  console.log("Error " + err);
});
module.exports = clientRedist;

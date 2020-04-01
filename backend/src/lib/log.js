const colors = require("colors");

exports.logRoutesInfoMiddleWare = function(req, res, next) {
  console.log(`${req.url}[${req.method}]`.yellow);
  next();
};

exports.logInfo = function(msg) {
  console.log(msg.green);
};

exports.logError = function(msg) {
  console.log(msg.red);
};

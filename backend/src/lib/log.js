const colors = require("colors");

exports.logRoutesInfoMiddleWare = function(req, res, next) {
  console.log(`${req.url}[${req.method}]`.yellow);
  next();
};

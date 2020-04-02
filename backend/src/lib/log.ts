import * as colors from "colors";

function logRoutesInfoMiddleWare(req, res, next) {
  console.log(colors.yellow(`${req.url}[${req.method}]`));
  next();
}

function logInfo(msg) {
  console.log(colors.green(msg));
}

function logError(msg) {
  console.log(colors.red(msg));
}

export { logRoutesInfoMiddleWare, logInfo, logError };

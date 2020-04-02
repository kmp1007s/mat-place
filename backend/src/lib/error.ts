import { logError } from "./log";

function makeErrResponse(errMessage) {
  return {
    error: errMessage
  };
}

function errorMiddleWare(err, req, res, next) {
  logError(err.stack);
  res.status(500).json(makeErrResponse(err.message));
}

function promiseWrapper(fn) {
  /* Promise를 사용하는 라우트 미들웨어를 반환 */
  return function(req, res, next) {
    fn(req, res, next).catch(next);
  };
}

export { makeErrResponse, errorMiddleWare, promiseWrapper };

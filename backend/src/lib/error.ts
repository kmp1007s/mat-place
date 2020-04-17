import { logError } from "./log";
import { Request, Response, NextFunction, RequestHandler } from "express";

interface ErrorResponse {
  error: string;
}

type AsyncHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<any>;

export function errorResponse(errorMessage: string): ErrorResponse {
  errorMessage.console("error");
  return {
    error: errorMessage,
  };
}

export function errorMiddleWare(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logError(err.stack);
  res.status(500).json(errorResponse(err.message));
}

export function promiseWrapper(fn: AsyncHandler): RequestHandler {
  /* Promise를 사용하는 라우트 미들웨어를 반환 */
  return function (req: Request, res: Response, next: NextFunction) {
    // promiseWrapper를 호출하여 반환된 함수를 RequestHandler로써 호출하고 promiseWrapper로 전달된 Request, Response, NextFunction 객체를 넘겨주어 호출하는 방식
    fn(req, res, next).catch(next);
  };
}

import { Request, Response, NextFunction, RequestHandler } from "express";

type HandlerUseAsync = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<any>;

class ErrorResponse {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

type ErrorStatus = 400 | 401 | 403 | 404 | 409;

function sendResponse(res: Response, status: ErrorStatus, message: string) {
  res.status(status).json(new ErrorResponse(message));
  message.log("fail");
}

export function extendResponse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.badRequest = (reason) => {
    const BAD_REQUEST_MESSAGE = reason;
    sendResponse(res, 400, BAD_REQUEST_MESSAGE);
  };

  res.unauthorized = (specificallyReason?) => {
    const UNAUTHORIZED_MESSAGE =
      specificallyReason || `Cannot identify the user. Not logged in`;
    sendResponse(res, 401, UNAUTHORIZED_MESSAGE);
  };

  res.forbidden = (specificallyReason?) => {
    const FORBIDDEN_MESSAGE = specificallyReason || `Authorization denied`;
    sendResponse(res, 403, FORBIDDEN_MESSAGE);
  };

  res.notFound = (object) => {
    const NOT_FOUND_MESSAGE = `${object} Not Found`;
    sendResponse(res, 404, NOT_FOUND_MESSAGE);
  };

  res.conflict = (object) => {
    const CONFLICT_MESSAGE = `${object} Conflict`;
    sendResponse(res, 409, CONFLICT_MESSAGE);
  };

  next();
}

export function handleErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  "Handle Erros".log();
  `${err.stack}`.log("fail");
  res.status(500).json(new ErrorResponse(err.message));
}

export function asyncWrapper(fn: HandlerUseAsync): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    (async (req, res, next) => {
      await fn(req, res, next);
      next();
    })(req, res, next).catch(next);
  };
}

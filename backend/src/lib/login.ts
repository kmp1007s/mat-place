import { Request, Response, NextFunction } from "express";
import { errorResponse } from "lib/error";
import * as errorType from "errorType";

export default function loginMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 로그인이 안 된 경우
  if (!req.user)
    return res.status(401).json(errorResponse(errorType.NOT_LOGGED_IN));

  "Login confirmed".console();
  next();
}

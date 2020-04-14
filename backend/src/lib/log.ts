import * as colors from "colors";
import { Request, Response, NextFunction } from "express";

export function logRoutesInfoMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(colors.yellow(`${req.url}[${req.method}]`));
  next();
}

export function logInfo(msg: string) {
  console.log(colors.green(msg));
}

export function logError(msg: string) {
  console.log(colors.red(msg));
}

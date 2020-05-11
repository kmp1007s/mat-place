import * as colors from "colors";
import { Request, Response, NextFunction } from "express";

type LogTypes = "info" | "success" | "fail";

declare global {
  interface String {
    log(type?: LogTypes): void;
  }
}

const logInfo = (msg: string) => {
  console.log(colors.yellow("Info: " + msg));
};

const logFail = (msg: string) => {
  console.log(colors.red("Fail: " + msg));
};

const logSuccess = (msg: string) => {
  console.log(colors.green("Success: " + msg));
};

/**
 * String.console("success")와 같이 접근 가능
 */
String.prototype.log = function (type: LogTypes) {
  switch (type || "default") {
    case "info":
      return logInfo(this);
    case "success":
      return logSuccess(this);
    case "fail":
      return logFail(this);
    default:
      return console.log(this);
  }
};

export function logRoutesInfo(req: Request, res: Response, next: NextFunction) {
  `${req.url}[${req.method}]`.log("info");
  next();
}

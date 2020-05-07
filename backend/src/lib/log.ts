import * as colors from "colors";
import { Request, Response, NextFunction } from "express";

declare global {
  interface String {
    console(type?: "fail" | "info" | "success" | "default"): void;
  }
}

/**
 * String.console("success")와 같이 접근 가능
 */
String.prototype.console = function (
  type: "fail" | "info" | "success" | "default" = "default"
) {
  switch (type) {
    case "fail":
      logFail(this);
      break;
    case "info":
      logInfo(this);
      break;
    case "success":
      logSuccess(this);
      break;
    default:
      console.log(this);
  }
};

/**
 * 아래는 String.console().success() 다음과 같이 접근 가능 (가독성의 문제로 위의 코드 채택)
 */
// declare global {
//   interface String {
//     console(): StringConsole;
//   }
// }

// interface StringConsole {
//   error(): void;
//   info(): void;
//   success(): void;
// }

// String.prototype.console = function () {
//   const stringValue = this;
//   return {
//     error: () => {
//       logError(stringValue);
//     },
//     info: () => {
//       logInfo(stringValue);
//     },
//     success: () => {
//       logSuccess(stringValue);
//     },
//     default: () => {
//       console.log(stringValue);
//     },
//   };
// };

export function logRoutesInfoMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  `${req.url}[${req.method}]`.console("info");
  next();
}

export function logInfo(msg: string) {
  console.log(colors.yellow(msg + " info"));
}

export function logFail(msg: string) {
  console.log(colors.red(msg + " error"));
}

export function logSuccess(msg: string) {
  console.log(colors.green(msg + " success"));
}

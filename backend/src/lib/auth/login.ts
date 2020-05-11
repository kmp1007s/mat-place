import { Request, Response, NextFunction } from "express";

export default function loginCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) return res.unauthorized(); // 로그인이 안 된 경우

  "Login confirmed".log();
  next();
}

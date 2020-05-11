import * as jwt from "jsonwebtoken";
import { respondSignedCookie, effectiveTimes } from "lib/cookie";
import { Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";

export interface DecodedToken {
  _id: mongoose.Types.ObjectId;
  userId: string;
  iat: number;
  exp: number;
}

export interface TokenPayload {
  _id: mongoose.Types.ObjectId;
  userId: string;
}

const SECRET = process.env.JWT_SECRET;

export const generate = (payload: TokenPayload) =>
  jwt.sign(payload, SECRET, { expiresIn: "1d" });

export const decode = (token: string) =>
  jwt.verify(token, SECRET) as DecodedToken;

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const token: string = req.signedCookies.token;

  if (!token) return next(); // 토큰이 없음

  try {
    const decoded = decode(token);

    const lifeLessThan12h = decoded.exp - Date.now() < effectiveTimes() / 2;

    // 토큰 만료시간이 12시간 남은 경우
    if (lifeLessThan12h) {
      const { _id, userId } = decoded;
      const freshToken = generate({ _id, userId });

      respondSignedCookie(res, "token", freshToken);
    }

    req.user = decoded;
    next();
  } catch (e) {
    // 토큰 검증 실패
    return res.unauthorized("Token Validate Failed");
  }
}

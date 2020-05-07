const jwtSecret = process.env.JWT_SECRET;
import * as jwt from "jsonwebtoken";
import { signOption } from "lib/cookie";
import { Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";
import { errorResponse } from "./error";

export interface DecodedToken {
  _id: mongoose.Types.ObjectId;
  userId: string;
  iat: number;
}

export function generateToken(payload: object): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: "1d",
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
}

export function decodeToken(token: string): Promise<DecodedToken> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded as DecodedToken);
    });
  });
}

export async function jwtMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: string | undefined = req.signedCookies.token;
  if (!token) return next();

  try {
    const decoded = await decodeToken(token);

    // 토큰 만료시간이 12시간 남은 경우
    if (Date.now() - decoded.iat > 60 * 60 * 1000 * 12) {
      const { _id, userId } = decoded;
      const freshToken = await generateToken({ _id, userId });

      res.cookie("token", freshToken, signOption());
    }

    req.user = decoded;
  } catch (e) {
    // 토큰 검증 실패
    req.user = null;
    res.status(401).json(errorResponse("Token Validate Error"));
    return;
  }

  return next();
}

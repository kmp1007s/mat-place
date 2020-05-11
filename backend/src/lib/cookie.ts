import { Response } from "express";

export const effectiveTimes = () => 1000 * 60 * 60 * 24; // 유효 시간 24시간

const signOption = (expirationDate?: Date) => ({
  expires: expirationDate || new Date(Date.now() + effectiveTimes()),
  httpOnly: true,
  signed: true,
});

export const respondSignedCookie = (
  res: Response,
  cookieName: string,
  cookieValue: string
) => {
  res.cookie(cookieName, cookieValue, signOption());
};

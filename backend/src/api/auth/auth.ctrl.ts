import { Response } from "express";
import { promiseWrapper, errorResponse } from "lib/error";
import { signOption } from "lib/cookie";
import accountModel from "model/account";
import * as errorType from "errorType";

const RespondLoginInfo = (token: string, res: Response, userId: string) => {
  res.cookie("token", token, signOption());
  res.json({ token, userId });
};

/**
 * [POST] /api/auth/register - 회원가입
 */
export const localRegister = promiseWrapper(async (req, res) => {
  let account = await accountModel.findByUserId(req.body.userId);

  // Conflict
  if (account)
    return res.status(409).json(errorResponse(errorType.confilct("User")));

  const { userId, pwd, userName } = req.body;
  account = await accountModel.localRegister({ userId, pwd, userName });

  const token = await account.generateToken();

  res.status(201);
  RespondLoginInfo(token, res, account.userId);

  "register".console("success");
});

/**
 * [POST] /api/auth/login/local - 로컬 계정 로그인
 */
export const localLogin = promiseWrapper(async (req, res) => {
  let account = await accountModel.findByUserId(req.body.userId);

  if (!account)
    return res.status(403).json(errorResponse(errorType.AUTHORIZATION_DENIED));

  const token = await account.generateToken();

  res.status(200);
  RespondLoginInfo(token, res, account.userId);

  "login".console("success");
});

/**
 * [POST] /api/auth/logout - 로그아웃
 */
export const logout = promiseWrapper(async (req, res) => {
  res.status(200).clearCookie("token").redirect("/");
  "logout".console("success");
});

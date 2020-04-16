import { Response } from "express";
import { promiseWrapper, errorResponse } from "lib/error";
import { logInfo } from "lib/log";
import { signOption } from "lib/cookie";
import accountModel from "model/account";
import * as errorType from "errorType";

const RespondLoginInfo = (token: string, res: Response, userId: string) => {
  res.cookie("access_token", token, signOption());
  res.json({ access_token: token, userId });
};

/**
 * [POST] /register - 회원가입
 */
export const localRegister = promiseWrapper(async (req, res) => {
  let account = await accountModel.findByUserId(req.body.userId);

  // Conflict
  if (account)
    return res.status(409).json(errorResponse(errorType.USER_EXISTS));

  account = await accountModel.localRegister(req.body);

  const token = await account.generateToken();
  RespondLoginInfo(token, res, account.userId);

  logInfo("Register success");
});

/**
 * [POST] /login/local - 로컬 계정 로그인
 */
export const localLogin = promiseWrapper(async (req, res) => {
  let account = await accountModel.findByUserId(req.body.userId);

  if (!account)
    return res.status(403).json(errorResponse(errorType.CANT_FIND_USER));

  const token = await account.generateToken();
  RespondLoginInfo(token, res, account.userId);

  logInfo("Login success");
});

/**
 * [POST] /logout - 로그아웃
 */
export const logout = promiseWrapper(async (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");

  logInfo("Logout success");
});

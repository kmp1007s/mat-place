import { Response } from "express";
import { promiseWrapper, errorResponse } from "lib/error";
import { logInfo, logError } from "lib/log";
import { signOption } from "lib/cookie";
import accountModel from "model/account";
import * as errorType from "errorType";

const RespondLoginInfo = (token: string, res: Response, userId: string) => {
  res.cookie("access_token", token, signOption());
  res.json({ access_token: token, userId });
};

export const localRegister = promiseWrapper(async (req, res) => {
  let account = await accountModel.findByUserId(req.body.userId);

  // Conflict
  if (account) {
    const errorMessage = errorType.USER_EXISTS;
    logError(errorMessage);
    return res.status(409).json(errorResponse(errorMessage));
  }

  account = await accountModel.localRegister(req.body);

  const token = await account.generateToken();
  RespondLoginInfo(token, res, account.userId);

  logInfo("Register Success");
});

export const localLogin = promiseWrapper(async (req, res) => {
  let account = await accountModel.findByUserId(req.body.userId);

  if (!account) {
    const errorMessage = errorType.CANT_FIND_USER;
    logError(errorMessage);
    return res.status(403).json(errorResponse(errorMessage));
  }

  const token = await account.generateToken();
  RespondLoginInfo(token, res, account.userId);

  logInfo("Login Success");
});

export const logout = promiseWrapper(async (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");

  logInfo("Logout Success");
});

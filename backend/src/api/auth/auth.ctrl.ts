import { Response } from "express";
import { promiseWrapper, errorResponse } from "lib/error";
import { logInfo, logError } from "lib/log";
import { signOption } from "lib/cookie";
import accountModel from "model/account";

const RespondLoginInfo = (token: string, res: Response, userId: string) => {
  res.cookie("access_token", token, signOption());
  res.json({ access_token: token, userId });
};

export const localRegister = promiseWrapper(async (req, res) => {
  let account = await accountModel.findByUserId(req.body.userId);

  // Conflict
  if (account) {
    const errMessage = "UserID Exists";

    logError(errMessage);
    return res.status(409).json(errorResponse(errMessage));
  }

  account = await accountModel.localRegister(req.body);

  const token = await account.generateToken();
  RespondLoginInfo(token, res, account.userId);

  logInfo("Register Success");
});

export const localLogin = promiseWrapper(async (req, res) => {
  let account = await accountModel.findByUserId(req.body.userId);

  if (!account) {
    const errMessage = "No User";

    logError(errMessage);
    return res.status(403).json(errorResponse(errMessage));
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

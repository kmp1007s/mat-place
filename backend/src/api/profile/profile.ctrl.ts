import { promiseWrapper, errorResponse } from "lib/error";
import { logInfo, logError } from "lib/log";
import accountModel from "model/account";
import * as errorType from "errorType";

export const getProfile = promiseWrapper(async (req, res) => {
  const { userId } = req.params;

  let account = await accountModel.findByUserId(userId);

  if (!account) {
    const errMessage = errorType.CANT_FIND_USER;
    logError(errMessage);
    return res.status(404).json(errorResponse(errMessage));
  }

  res.json({
    userId: account.userId,
    userName: account.userName,
    createdAt: account.createdAt,
  });

  logInfo("Get Profile Success");
});

export const updateProfile = promiseWrapper(async (req, res) => {
  const { userId } = req.params;

  // 토큰 자격증명 비교를 통한 권한 체크
  if (userId !== req.user.userId) {
    const errorMessage = errorType.AUTHORIZATION_DENIED;
    logError(errorMessage);
    return res.status(403).json(errorResponse(errorMessage));
  }

  let account = await accountModel.findByUserIdAndUpdate(userId, req.body);

  if (!account) {
    const errorMessage = errorType.CANT_FIND_USER;
    logError(errorMessage);
    return res.status(404).json(errorResponse(errorMessage));
  }

  res.json({
    userId: account.userId,
    userName: account.userName,
    createdAt: account.createdAt,
  });

  logInfo("Update Profile Success");
});

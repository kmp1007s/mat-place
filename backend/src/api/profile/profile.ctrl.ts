import { promiseWrapper, errorResponse } from "lib/error";
import { logInfo, logError } from "lib/log";
import accountModel from "model/account";

export const getProfile = promiseWrapper(async (req, res) => {
  const { userId } = req.params;

  let account = await accountModel.findByUserId(userId);

  if (!account) {
    const errMessage = "No User";

    logError(errMessage);

    // 해당 자원을 못찾았으므로 404
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
    const errMessage = "No Authorization";
    logError(errMessage);
    return res.status(403).json(errorResponse(errMessage));
  }

  let account = await accountModel.findByUserIdAndUpdate(userId, req.body);

  if (!account) {
    const errMessage = "No User";
    logError(errMessage);
    return res.status(404).json(errorResponse(errMessage));
  }

  res.json({
    _id: account._id,
    userId: account.userId,
    userName: account.userName,
    createdAt: account.createdAt,
  });

  logInfo("Update Profile Success");
});

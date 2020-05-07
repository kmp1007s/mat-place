import { promiseWrapper, errorResponse } from "lib/error";
import accountModel from "model/account";
import * as errorType from "errorType";

/**
 * [GET] /api/profiles/:userId - userId로 프로필 조회
 */
export const readProfile = promiseWrapper(async (req, res) => {
  const { userId } = req.params;

  let account = await accountModel.findByUserId(userId);

  if (!account)
    return res.status(404).json(errorResponse(errorType.notFound("User")));

  res.json({
    userId: account.userId,
    userName: account.userName,
    createdAt: account.createdAt,
  });

  "get profile".console("success");
});

/**
 * [PATCH] /api/profiles/:userId - userId로 프로필 업데이트
 */
export const updateProfile = promiseWrapper(async (req, res) => {
  const { userId } = req.params;

  let account = await accountModel.findByUserId(userId);

  if (!account)
    return res.status(404).json(errorResponse(errorType.notFound("User")));

  // 토큰 자격증명 비교를 통한 권한 체크
  if (userId !== req.user.userId)
    return res.status(403).json(errorResponse(errorType.AUTHORIZATION_DENIED));

  account = await accountModel.findByUserIdAndUpdate(userId, req.body);

  res.json({
    userId: account.userId,
    userName: account.userName,
    createdAt: account.createdAt,
  });

  "update profile".console("success");
});

import Joi = require("@hapi/joi");
import accountModel from "model/account";
import { asyncWrapper } from "lib/error";

/**
 * [GET] /api/profiles/:userId - userId로 프로필 조회
 */
export const readProfile = asyncWrapper(async (req, res) => {
  const { userId } = req.params;

  const account = await accountModel.getAccountByUserId(userId);
  if (!account) return res.notFound("User");

  res.json(account.serialize());
});

/**
 * [PATCH] /api/profiles/:userId - userId로 프로필 업데이트
 */
export const updateProfile = asyncWrapper(async (req, res) => {
  const { userId } = req.params;
  const { userName } = req.body;

  const requestSchema = Joi.object().keys({
    userId: Joi.string(),
    password: Joi.string(),
    userName: Joi.string(),
  });

  let account = await accountModel.getAccountByUserId(userId);
  if (!account) return res.notFound("User"); // User 찾기 실패

  const userMatched = account.userId === req.user.userId;
  if (!userMatched) return res.forbidden(); // 수정 권한 없음

  const { error } = requestSchema.validate(req.body);
  if (error) return res.badRequest(error.message); // 리퀘스트 검증 실패

  if (
    req.body.userId &&
    (await accountModel.getAccountByUserId(req.body.userId)) // 변경하려는 Id의 유저가 이미 존재한다면
  )
    return res.conflict("User");

  const toUpdate = userName
    ? { ...req.body, profile: { ...account.profile, userName } }
    : req.body;

  account = await accountModel.updateAccountByUserId(userId, toUpdate);
  res.json(account.serialize());
});

/**
 * [POST] /api/profiles/:userId/image - userId로 프로필 업데이트
 */
export const updateProfileImage = asyncWrapper(async (req, res) => {
  const { userId } = req.params;
  const { file } = req;

  let account = await accountModel.getAccountByUserId(userId);
  if (!account) return res.notFound("User"); // User 찾기 실패

  const userMatched = account.userId === req.user.userId;
  if (!userMatched) return res.forbidden(); // 수정 권한 없음

  const profile = {
    userName: account.profile.userName,
    image: `/public/profile/img/${file.filename}`,
  };

  account = await accountModel.updateAccountByUserId(userId, {
    profile,
  });

  res.json({
    imgName: account.profile.image,
  });
});

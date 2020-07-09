import { Response } from "express";
import Joi = require("@hapi/joi");
import accountModel from "model/account";
import { asyncWrapper } from "lib/error";
import { respondSignedCookie } from "lib/cookie";

const RespondLoginSuccess = (token: string, res: Response, userId: string) => {
  respondSignedCookie(res, "token", token);
  res.json({ token, userId });
};

/**
 * [POST] /api/auth/register - 회원가입
 */
export const localRegister = asyncWrapper(async (req, res) => {
  const { userId } = req.body;

  const requestSchema = Joi.object().keys({
    userId: Joi.string().required(),
    password: Joi.string().required(),
    userName: Joi.string().required(),
  });

  const { error } = requestSchema.validate(req.body);
  if (error) return res.badRequest(error.message); // 리퀘스트 검증 실패

  let account = await accountModel.getAccountByUserId(userId);

  if (account) return res.conflict("User"); // 유저 충돌

  account = await accountModel.localRegister(req.body);
  const token = await account.generateToken();

  res.status(201);
  RespondLoginSuccess(token, res, userId);
});

/**
 * [POST] /api/auth/login/local - 로컬 계정 로그인
 */
export const localLogin = asyncWrapper(async (req, res) => {
  const { userId, password } = req.body;

  const requestSchema = Joi.object().keys({
    userId: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = requestSchema.validate(req.body);
  if (error) return res.badRequest(error.message); // 리퀘스트 검증 실패

  const account = await accountModel.getAccountByUserId(userId);
  if (!account || !account.validatePassword(password)) return res.forbidden(); // 로그인 인증 실패

  const token = account.generateToken();
  RespondLoginSuccess(token, res, userId);
});

export const tokenCheck = asyncWrapper(async (req, res) => {
  const { user } = req;

  if (!user) return res.unauthorized();

  const { userId } = user;

  const account = await accountModel.getAccountByUserId(userId);
  if (!account) return res.forbidden();

  res.json(userId).status(200);
});

/**
 * [POST] /api/auth/logout - 로그아웃
 */
export const logout = asyncWrapper(async (req, res) => {
  // res.clearCookie("token").status(204).end();
  res.clearCookie("token").redirect(204, "/");
});

import Joi = require("@hapi/joi");
import { Types } from "mongoose";
import reviewModel from "model/review";
import { asyncWrapper } from "lib/error";

const { ObjectId } = Types;

function userIsCreator(requestUserId: string, reviewUserId: string) {
  return requestUserId === reviewUserId;
}

/**
 * [POST] /api/reviews - review 생성
 */
export const createReview = asyncWrapper(async (req, res) => {
  const { userId } = req.user;

  const requestSchema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    placeId: Joi.string().required(),
    rates: Joi.number().min(0).max(5).required(),
  });

  const { error } = requestSchema.validate(req.body);
  if (error) return res.badRequest(error.message);

  const review = await reviewModel.createReview(userId, req.body);
  res.json(review);
});

/**
 * [GET] /api/reviews - review 전체 가져오기
 */
export const getAllReviews = asyncWrapper(async (req, res) => {
  const reviews = await reviewModel.getAllReviews();
  res.json(reviews);
});

/**
 * [GET] /api/reviews/:id - review id로 조회
 */
export const getReviewById = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.badRequest("Unexpected ObjectId");

  const review = await reviewModel.getReviewById(id);

  if (!review) return res.notFound("Review");
  res.json(review);
});

/**
 * [PATCH] /api/reviews/:id - 특정 review 수정하기
 */
export const updateReviewById = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  const requestSchema = Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    placeId: Joi.string(),
    rates: Joi.number().min(0).max(5),
  });

  if (!ObjectId.isValid(id)) return res.badRequest("Unexpected ObjectId");

  let review = await reviewModel.getReviewById(id);

  if (!review) return res.notFound("Review");
  if (!userIsCreator(userId, review.userId)) return res.forbidden();

  const { error } = requestSchema.validate(req.body);
  if (error) return res.badRequest(error.message);

  review = await reviewModel.updateReviewById(id, req.body);

  res.json(review);
});

/**
 * [DELETE] /api/reviews/:id - 특정 review 삭제
 */
export const deleteReviewById = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.badRequest("Unexpected ObjectId");

  const review = await reviewModel.getReviewById(id);

  if (!review) return res.notFound("Review");
  if (!userIsCreator(userId, review.userId)) return res.forbidden();

  await reviewModel.deleteReviewById(id);
  res.status(204);
});

import { promiseWrapper, errorResponse } from "lib/error";
import reviewModel from "model/review";
import * as errorType from "errorType";
import { Types } from "mongoose";

async function reviewExists(id: string | Types.ObjectId) {
  return await reviewModel.getReviewById(id);
}

async function requestPermission(userId: string, id: string | Types.ObjectId) {
  return (
    (await userId) !== (await reviewModel.getReviewById(id)).userId || false
  );
}

function reviewNotFoundResponse(res) {
  res.status(404).json(errorResponse(errorType.notFound("Review")));
  "review not found".console("fail");
}

function permissionDeniedResponse(res) {
  res.status(403).json(errorResponse(errorType.AUTHORIZATION_DENIED));
  "userId not matched".console("fail");
}

/**
 * [POST] /api/reviews - review 생성
 */
export const createReview = promiseWrapper(async (req, res) => {
  const { userId } = req.user;

  const review = await reviewModel.createReview({ userId, ...req.body });

  res.json(review);
  "create review".console("success");
});

/**
 * [GET] /api/reviews - review 전체 가져오기
 */
export const getAllReviews = promiseWrapper(async (req, res) => {
  const reviews = await reviewModel.getAllReviews();

  res.json(reviews);
  "get all reviews".console("success");
});

/**
 * [GET] /api/reviews/:id - review id로 조회
 */
export const getReviewById = promiseWrapper(async (req, res) => {
  const { id } = req.params;

  if (!(await reviewExists(id))) return reviewNotFoundResponse(res);
  const review = await reviewModel.getReviewById(id);

  res.json(review);
  "get review by id".console("success");
});

/**
 * [PATCH] /api/reviews/:id - 특정 review 수정하기
 */
export const updateReviewById = promiseWrapper(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  if (!(await reviewExists(id))) return reviewNotFoundResponse(res);
  if (!(await requestPermission(userId, id)))
    return permissionDeniedResponse(res);

  const review = await reviewModel.updateReviewById(id, { ...req.body });

  res.json(review);
  "update review by id".console("success");
});

/**
 * [DELETE] /api/reviews/:id - 특정 review 삭제
 */
export const deleteReviewById = promiseWrapper(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  if (!(await reviewExists(id))) return reviewNotFoundResponse(res);
  if (!(await requestPermission(userId, id)))
    return permissionDeniedResponse(res);

  await reviewModel.deleteReviewById(id);

  res.status(204);
  "delete review by id".console("success");
});

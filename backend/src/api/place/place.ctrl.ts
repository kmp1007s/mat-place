import { promiseWrapper, errorResponse } from "lib/error";
import { logInfo } from "lib/log";
import placeListModel from "model/place";
import * as errorType from "errorType";

/**
 * [GET] /list - 맛집 리스트 전체 조회
 */
export const readPlaceList = promiseWrapper(async (req, res) => {
  const { userId } = req.user;

  const placeList = await placeListModel.findByAuthorId(userId);

  res.json(placeList);
  logInfo("readPlaceList success");
});

/**
 * [POST] /list - 맛집 리스트 생성
 */
export const cretePlaceList = promiseWrapper(async (req, res) => {
  const { userId } = req.user;

  const placeList = await placeListModel.createPlaceList(userId, req.body);

  res.json(placeList);
  logInfo("createPlacList success");
});

/**
 * [GET group/:name - 그룹명으로 맛집 리스트 가져오기]
 */
export const readByGroup = promiseWrapper(async (req, res) => {
  const { userId } = req.user;
  const { name } = req.params;

  const placeList = await placeListModel.findByGroup(userId, name);

  res.json(placeList);
  logInfo("readByGroup success");
});

/**
 * [PATCH] /group - 그룹명 수정하기
 */
export const updateGroup = promiseWrapper(async (req, res) => {
  const { userId } = req.user;
  const { ids, group } = req.body;

  const placeList = await placeListModel.updateGroup(userId, ids, group);

  res.json(placeList);
  logInfo("updateGroup success");
});

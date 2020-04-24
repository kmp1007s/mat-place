import { promiseWrapper, errorResponse } from "lib/error";
import placeListModel from "model/place";
import groupModel from "model/group";
import * as errorType from "errorType";

/**
 * [GET] /place-lists?group=... - 맛집 리스트 전체 조회
 */
export const readPlaceList = promiseWrapper(async (req, res) => {
  const { userId } = req.user;
  const { group } = req.query;

  const placeList = group
    ? await placeListModel.getPlaceListByAuthorId(userId, group)
    : await placeListModel.getPlaceListByAuthorId(userId);

  res.json(placeList);
  "read place list".console("success");
});

/**
 * [POST] /place-lists - 맛집 리스트 생성
 */
export const cretePlaceList = promiseWrapper(async (req, res) => {
  const { userId } = req.user;

  const placeList = await placeListModel.createPlaceList(userId, req.body);

  res.json(placeList);
  "create place list".console("success");
});

/**
 * [PATCH] /group - 그룹 수정하기
 */
export const updateGroup = promiseWrapper(async (req, res) => {
  const { userId } = req.user;
  const { ids, group } = req.body;

  const placeList = await placeListModel.updateGroup(userId, ids, group);

  res.json(placeList);
  "update group".console("success");
});

/**
 * [DELETE] /group/:name - 그룹 삭제 (none으로 설정)
 */
export const deleteGroup = promiseWrapper(async (req, res) => {
  const { name } = req.params;

  const placeList = await placeListModel.deleteGroup(name);

  res.json(placeList);
  "delete group".console("success");
});

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

  const placeLists = group
    ? await placeListModel.getPlaceListByGroups(userId, group)
    : await placeListModel.getPlaceListByUserId(userId);

  res.json(placeLists);
  "read place list".console("success");
});

/**
 * [POST] /place-lists - 맛집 리스트 생성
 */
export const cretePlaceList = promiseWrapper(async (req, res) => {
  const { userId } = req.user;

  const placeList = await placeListModel.createPlaceList({
    userId,
    ...req.body,
  });

  res.json(placeList);
  "create place list".console("success");
});

/**
 * [CREATE] /place-lists/groups - 그룹 수정하기
 */
export const createGroup = promiseWrapper(async (req, res) => {
  const { userId } = req.user;
  const { name } = req.body;
  const group = await groupModel.createGroup(userId, name);

  if (!group) {
    res.status(409);
    return "group conflict".console("error");
  }
  res.json(group);
  "create group success".console("success");
});

/**
 * [PATCH] /place-lists/groups/:name - 그룹 수정하기
 */
export const updateGroup = promiseWrapper(async (req, res) => {
  const { userId } = req.user;
  const { name } = req.params;
  const { placeListIds } = req.body;

  const placeList = await groupModel.updatePlaceListIdsByGroupName(
    userId,
    name,
    placeListIds
  );

  if (placeList) {
    res.json(placeList);
    "update group".console("success");
  } else {
    res.status(404);
    "couldn't find group".console("error");
  }
});

/**
 * [DELETE] /place-lists/groups/:name - 그룹 삭제
 */
export const deleteGroup = promiseWrapper(async (req, res) => {
  const { userId } = req.user;
  const { name } = req.params;

  if (!(await groupModel.getGroupNames(userId)).includes(name)) {
    res.status(404);
    return "couldn't find group".console("error");
  }

  await groupModel.deleteGroup(userId, name);

  res.status(204);
  "delete group".console("success");
});

import { promiseWrapper, errorResponse } from "lib/error";
import placeListModel from "model/place";
import groupModel from "model/group";
import * as errorType from "errorType";

function groupNotFoundResponse(res) {
  res.status(404).json(errorResponse(errorType.notFound("Group")));
  "couldn't find group".console("fail");
}

/**
 * [GET] /api/place-lists?group=... - 맛집 리스트 전체 조회
 */
export const readPlaceList = promiseWrapper(async (req, res) => {
  const { userId } = req.user;
  const { group } = req.query;

  let placeLists = null;

  if (group) {
    if (!(await groupModel.groupExists(userId, group)))
      return groupNotFoundResponse(res);
    placeLists = await placeListModel.getPlaceListsByGroups(userId, group);
  } else placeLists = await placeListModel.getPlaceListsByUserId(userId);

  res.json(placeLists);
  "read place list".console("success");
});

/**
 * [POST] /api/place-lists - 맛집 리스트 생성
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
 * [POST] /api/place-lists/groups - 그룹 생성하기
 */
export const createGroup = promiseWrapper(async (req, res) => {
  const { userId } = req.user;
  const { name, placeListIds } = req.body;

  if (await groupModel.groupExists(userId, name)) {
    res.status(409).json(errorResponse(errorType.confilct("Group")));
    return "group conflict".console("fail");
  }

  const group = placeListIds
    ? await groupModel.createGroup(userId, name, placeListIds)
    : await groupModel.createGroup(userId, name);

  res.json(group);
  "create group".console("success");
});

/**
 * [PATCH] /api/place-lists/groups/:name - 그룹 수정하기
 */
export const updateGroup = promiseWrapper(async (req, res) => {
  const { userId } = req.user;
  const { name } = req.params;
  const { nameUpdateTo, placeListIds } = req.body;

  if (!(await groupModel.groupExists(userId, name)))
    return groupNotFoundResponse(res);

  const placeList = await groupModel.updateGroup(userId, name, {
    nameUpdateTo,
    placeListIds,
  });

  res.json(placeList);
  "update group".console("success");
});

/**
 * [DELETE] /api/place-lists/groups/:name - 그룹 삭제
 */
export const deleteGroup = promiseWrapper(async (req, res) => {
  const { userId } = req.user;
  const { name } = req.params;

  if (!(await groupModel.groupExists(userId, name)))
    return groupNotFoundResponse(res);

  await groupModel.deleteGroup(userId, name);

  res.status(204);
  "delete group".console("success");
});

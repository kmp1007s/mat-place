import Joi = require("@hapi/joi");
import { Types } from "mongoose";
import placeListModel from "model/place";
import accountModel from "model/account";
import groupModel from "model/group";
import { asyncWrapper } from "lib/error";

const { ObjectId } = Types;

const userIsCreator = (requestUserId: string, documentUserId: string) =>
  requestUserId === documentUserId;

/**
 * [POST] /api/place-lists - 맛집 리스트 생성
 */
export const cretePlaceList = asyncWrapper(async (req, res) => {
  const { userId } = req.user;

  const requestSchema = Joi.object().keys({
    title: Joi.string().required(),
    places: Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().required(),
          name: Joi.string().required(),
          address: Joi.string().required(),
          phone: Joi.string().allow(""),
        })
      )
      .required(),
    public: Joi.boolean().required(),
  });

  const { error } = requestSchema.validate(req.body);
  if (error) return res.badRequest(error.message); // 리퀘스트 검증 실패

  const placeList = await placeListModel.createPlaceList(userId, req.body);
  res.status(201).json(placeList);
});

export const getAllPublicPlaceList = asyncWrapper(async (req, res) => {
  const placeLists = await placeListModel.getAllPublicPlaceLists();
  res.json(placeLists);
});

/**
 * [GET] /api/place-lists/:id - 특정 맛집 리스트 조회
 */
export const getPlaceListById = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.badRequest("Unexpected ObjectId"); // ObjectId 검증 실패

  const placeList = await placeListModel.getPlaceListById(id);
  if (!placeList) return res.notFound("PlaceList"); // PlaceList 찾기 실패

  const placeListIsPrivate = !placeList.public;
  const userCanReadPrivate = userId && userIsCreator(userId, placeList.userId);

  if (placeListIsPrivate && !userCanReadPrivate)
    // Private 문서를 가져올 권한이 없음
    return res.forbidden(
      "This place list is private. You don't have permission for this place list"
    );

  res.json(placeList);
});

/**
 * [GET] /api/place-lists/users/:id?group=groupName - 특정 유저의 맛집 리스트들을 가져옴
 */
export const getPlaceListsByUserId = asyncWrapper(async (req, res) => {
  let userId = null;
  if (req.user) userId = req.user.userId;

  const { id } = req.params;
  const { group } = req.query;

  const account = await accountModel.getAccountByUserId(id);
  if (!account) return res.notFound("User"); // 유저 찾기 실패

  let placeLists = [];
  const getPrivatesToo = userId && userIsCreator(userId, id);

  if (group) {
    if (!(await groupModel.getGroupByGroupName(id, group)))
      // 그룹 찾기 실패
      return res.notFound("Group");

    placeLists = getPrivatesToo
      ? await placeListModel.getAllPlaceListsByGroups(id, group)
      : await placeListModel.getPublicPlaceListsByGroups(id, group);
  } else {
    placeLists = getPrivatesToo
      ? await placeListModel.getAllPlaceListsByUserId(id)
      : await placeListModel.getPublicPlaceListsByUserId(id);
  }

  res.json(placeLists);
});

/**
 * [PATCH] /api/place-lists/:id - 특정 맛집 리스트 수정
 */
export const updatePlaceListById = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  const requestSchema = Joi.object().keys({
    title: Joi.string(),
    places: Joi.array().items(
      Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().allow(""),
      })
    ),
    public: Joi.boolean(),
  });

  if (!ObjectId.isValid(id)) return res.badRequest("Unexpected ObjectId"); // ObjectId 검증 실패

  let placeList = await placeListModel.getPlaceListById(id);

  if (!placeList) return res.notFound("PlaceList"); // placeList 찾기 실패
  if (!userIsCreator(userId, placeList.userId)) return res.forbidden(); // 수정 권한 없음
  const { error } = requestSchema.validate(req.body);
  if (error) return res.badRequest(error.message); // 리퀘스트 검증 실패

  placeList = await placeListModel.updatePlaceListById(id, req.body);
  res.json(placeList);
});

/**
 * [DELETE] /api/place-lists/:id - 특정 맛집 리스트 삭제
 */
export const deletePlaceListById = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.badRequest("Unexpected ObjectId"); // ObjectId 검증 실패

  const placeList = await placeListModel.getPlaceListById(id);

  if (!placeList) return res.notFound("PlaceList"); // PlaceList 찾기 실패
  if (!userIsCreator(userId, placeList.userId)) return res.forbidden(); // 삭제 권한 없음

  await placeListModel.deletePlaceListById(id);

  res.status(204).end();
});

/**
 * [POST] /api/place-lists/public/:id - 맛집 리스트를 공개로 전환
 */
export const makePlaceListPublic = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.badRequest("Unexpected ObjectId"); // ObjectId 검증 실패

  let placeList = await placeListModel.getPlaceListById(id);

  if (!placeList) return res.notFound("PlaceList"); // PlaceList 찾기 실패
  if (!userIsCreator(userId, id)) return res.forbidden(); // 수정 권한 없음

  placeList = await placeListModel.makePlaceListPublic(id);
  res.json(placeList);
});

/**
 * [POST] /api/place-lists/private/:id - 맛집 리스트를 비공개로 전환
 */
export const makePlaceListPrivate = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.badRequest("Unexpected ObjectId"); // ObjectId 검증 실패

  let placeList = await placeListModel.getPlaceListById(id);

  if (!placeList) return res.notFound("PlaceList"); // PlaceList 찾기 실패
  if (!userIsCreator(userId, id)) return res.forbidden(); // 수정 권한 없음

  placeList = await placeListModel.makePlaceListPrivate(id);
  res.json(placeList);
});

export const getGroupsByUserId = asyncWrapper(async (req, res) => {
  const { userId } = req.params;

  const groups = await groupModel.getGroupNames(userId);
  res.json(groups);
});

/**
 * [POST] /api/place-lists/groups - 그룹 생성하기
 */
export const createGroup = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const { name, placeListIds } = req.body;

  const requestSchema = Joi.object().keys({
    name: Joi.string().required(),
    placeListIds: Joi.array().items(Joi.string()),
  });

  const { error } = requestSchema.validate(req.body);
  if (error) return res.badRequest(error.message); // 리퀘스트 검증 실패

  for (let i = 0; placeListIds.length > 0 && i < placeListIds.length; i++) {
    if (!ObjectId.isValid(placeListIds[i]))
      // 그룹에 추가할 PlaceListId의 ObjectId 검증 실패
      return res.badRequest("Unexpected ObjectId");
    if (!placeListModel.getPlaceListById(placeListIds[i]))
      // 그룹에 추가할 PlaceList를 찾지 못함
      return res.badRequest(
        "Result searching by place list's id is not exists"
      );
  }

  if (await groupModel.getGroupByGroupName(userId, name))
    return res.conflict("Group"); // 그룹 충돌

  const group = await groupModel.createGroup(userId, req.body);
  res.status(201).json(group);
});

/**
 * [PATCH] /api/place-lists/groups/:name - 그룹 수정하기
 */
export const updateGroup = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const { name } = req.params;
  const { placeListIds } = req.body;

  const requestSchema = Joi.object().keys({
    nameUpdateTo: Joi.string(),
    placeListIds: Joi.array().items(Joi.string()),
  });

  if (!(await groupModel.getGroupByGroupName(userId, name)))
    // 그룹 찾기 실패
    return res.notFound("Group");

  const { error } = requestSchema.validate(req.body);
  if (error) return res.badRequest(error.message); // 리퀘스트 검증 실패

  for (let i = 0; placeListIds.length > 0 && i < placeListIds.length; i++) {
    if (!ObjectId.isValid(placeListIds[i]))
      // 그룹에 추가할 PlaceListId의 ObjectId 검증 실패
      return res.badRequest("Unexpected ObjectId");
    if (!placeListModel.getPlaceListById(placeListIds[i]))
      // 그룹에 추가할 PlaceList를 찾지 못함
      return res.badRequest(
        "Result searching by place list's id is not exists"
      );
  }

  const placeList = await groupModel.updateGroup(userId, name, req.body);
  res.json(placeList);
});

/**
 * [DELETE] /api/place-lists/groups/:name - 그룹 삭제
 */
export const deleteGroup = asyncWrapper(async (req, res) => {
  const { userId } = req.user;
  const { name } = req.params;

  const group = await groupModel.getGroupByGroupName(userId, name);
  if (!group)
    // 그룹 찾기 실패
    return res.notFound("Group");
  if (userIsCreator(userId, group.userId)) return res.forbidden();

  await groupModel.deleteGroup(userId, name);

  res.status(204);
});

import { request } from "lib/axios";

export type Place = {
  _id?: string;
  id: string;
  name: string;
  address: string;
  phone: string;
};

export type PlaceList = {
  _id?: string;
  places: Array<Place>;
  public: boolean;
  userId: string;
  title: string;
  createdAt: string;
};

export type PlaceLists = Array<PlaceList> | null;

export const getAllPublicPlaceLists = () =>
  request<PlaceLists, void>({
    method: "GET",
    url: "place-lists",
  });

export const getPlaceListsByUser = (userId: string) =>
  request<PlaceLists, void>({
    method: "GET",
    url: `place-lists/users/${userId}`,
  });

export type CreateGroupParam = {
  name: string;
  placeListIds?: Array<string>;
};
export type Group = {
  userId: string;
  name: string;
  placeListIds: Array<string>;
  createdAt: string;
};
export const createGroup = (data: CreateGroupParam) =>
  request<Group, CreateGroupParam>({
    method: "POST",
    url: "place-lists/groups",
    data,
  });

export type GetGroupResponse = Array<string> | null;
export const getGroupByUser = (userId: string) =>
  request<Array<Group>, void>({
    method: "GET",
    url: `place-lists/groups/users/${userId}`,
  });

type UpdateGroupParam = { nameUpdateTo?: string; placeListIds?: Array<string> };
export const updateGroup = (groupName: string, data: UpdateGroupParam) =>
  request<Group, UpdateGroupParam>({
    method: "PATCH",
    url: `place-lists/groups/${groupName}`,
    data,
  });

export const getPlaceListsByGroup = (groupName: string, userId: string) =>
  request<PlaceLists, void>({
    method: "GET",
    url: `place-lists/users/${userId}?group=${groupName}`,
  });

export const getGroup = (groupName: string) =>
  request<Group, void>({
    method: "GET",
    url: `place-lists/groups/${groupName}`,
  });

type AddPlaceListParam = {
  title: string;
  places: Array<Place>;
  public: boolean;
};
export const addPlaceList = (data: AddPlaceListParam) =>
  request<PlaceList, AddPlaceListParam>({
    method: "POST",
    url: "place-lists",
    data,
  });

type UpdatePlaceListParam = {
  title?: string;
  places?: Array<Place>;
  public?: boolean;
};
export const updatePlaceList = (
  placeListId: string,
  data: UpdatePlaceListParam
) =>
  request<PlaceList, UpdatePlaceListParam>({
    method: "PATCH",
    url: `place-lists/${placeListId}`,
    data,
  });

export const deletePlaceList = (placeListId: string) =>
  request<void, void>({
    method: "DELETE",
    url: `place-lists/${placeListId}`,
  });

export const deleteGroup = (groupName: string) =>
  request<void, void>({
    method: "DELETE",
    url: `place-lists/groups/${groupName}`,
  });

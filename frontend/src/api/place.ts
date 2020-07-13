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

export const getPlaceListsByUser = (userId: string) =>
  request<PlaceLists, void>({
    method: "GET",
    url: `place-lists/users/${userId}`,
  });

export const getGroupByUser = (userId: string) =>
  request<Array<string> | null, void>({
    method: "GET",
    url: `place-lists/groups/${userId}`,
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

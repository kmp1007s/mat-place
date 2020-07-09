import { request } from "lib/axios";

type MongoId = {
  _id: string;
};

export type Place = MongoId & {
  id: string;
  name: string;
};

export type PlaceList = MongoId & {
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

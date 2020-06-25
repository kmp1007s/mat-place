import { request } from "lib/axios";

type MongoResponse = {
  _id: string;
};

export type PlaceList = MongoResponse & {
  placeIds: Array<string>;
  public: boolean;
  userId: string;
  title: string;
  createdAt: string;
};

export type PlaceLists = Array<PlaceList>;

export const getPlaceListsByUser = (userId: string) =>
  request<PlaceLists, void>("GET", `place-lists/users/${userId}`);

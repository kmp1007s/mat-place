import { request } from "lib/axios";

type MongoResponse = {
  _id: string;
};

export type UserResponse = MongoResponse & {
  userId: string;
  profile: {
    userName: string;
    image: string;
  };
  createdAt: string;
};

export const getUserById = (userId: string) =>
  request<UserResponse, string>("GET", `profiles/${userId}`, userId);

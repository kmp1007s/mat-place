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
  request<UserResponse, string>({
    method: "GET",
    url: `profiles/${userId}`,
    data: userId,
  });

export const updateUserByUserId = (param: {
  userId: string;
  userName: string;
}) => {
  const { userId, userName } = param;

  return request<UserResponse, object>({
    method: "PATCH",
    url: `profiles/${userId}`,
    data: {
      userName,
    },
  });
};

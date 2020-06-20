import axios from "lib/axios";

type MongoResponse = {
  _id: string;
};

export type UserResponse = MongoResponse & {
  userId: string;
  profile: {
    userName: string;
    image: string;
  };
  createdAt: Date;
};

export const getUserById = async (userId: string) => {
  const response = await axios.get<UserResponse>(`profiles/${userId}`);
  console.log(response);

  return response;
};

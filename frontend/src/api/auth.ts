import axios, { request } from "lib/axios";

export type LoginParam = { userId: string; password: string };
export type LoginResponse = { token: string; userId: string };

export type ReigsterParam = LoginParam & { userName: string };

export const login = (loginParam: LoginParam) => {
  return request<LoginResponse, LoginParam>(
    "POST",
    "auth/login/local",
    loginParam
  );

  // const response = await axios.post<LoginResponse>(
  //   "auth/login/local",
  //   loginParam
  // );
  // console.log("login response: ", response);

  // return response;
};

export const register = async (registerParam: ReigsterParam) => {
  const response = await axios.post<LoginResponse>(
    "auth/register",
    registerParam
  );
  console.log("register response: ", response);

  return response;
};

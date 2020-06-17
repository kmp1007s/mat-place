import axios from "lib/axios";

export type LoginParam = { userId: string; password: string };
export type LoginResponse = { token: string; userId: string };

export type ReigsterParam = LoginParam & { userName: string };

export const login = async (loginParam: LoginParam) => {
  const response = await axios.post<LoginResponse>(
    "auth/login/local",
    loginParam
  );
  console.log("login response: ", response);

  return response;
};

export const register = async (registerParam: ReigsterParam) => {
  const response = await axios.post<LoginResponse>(
    "auth/register",
    registerParam
  );
  console.log("register response: ", response);

  return response;
};

import axios from "./axios";

type LoginParam = { userId: string; password: string };
type ReigsterParam = LoginParam & { userName: string };

export const login = async (loginParam: LoginParam) => {
  const response = await axios.post("auth/login/local", loginParam);
  console.log("login response: ", response);

  return response.data;
};

export const register = async (registerParam: ReigsterParam) => {
  const response = await axios.post("auth/register", registerParam);
  console.log("register response: ", response);

  return response.data;
};

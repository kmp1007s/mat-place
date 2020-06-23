import { request } from "lib/axios";

export type LoginParam = { userId: string; password: string };
export type LoginResponse = { token: string; userId: string };

export type ReigsterParam = LoginParam & { userName: string };

export const login = (loginParam: LoginParam) =>
  request<LoginResponse, LoginParam>("POST", "auth/login/local", loginParam);

export const register = (registerParam: ReigsterParam) =>
  request<LoginResponse, ReigsterParam>("POST", "auth/register", registerParam);

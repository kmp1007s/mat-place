import { request } from "lib/axios";

export type LoginParam = { userId: string; password: string };
export type LoginResponse = { token: string; userId: string };

export type ReigsterParam = LoginParam & { userName: string };

export const login = (loginParam: LoginParam) =>
  request<LoginResponse, LoginParam>({
    method: "POST",
    url: "auth/login/local",
    data: loginParam,
  });

export const logout = () =>
  request<void, void>({
    method: "POST",
    url: "auth/logout",
  });

export const register = (registerParam: ReigsterParam) =>
  request<LoginResponse, ReigsterParam>({
    method: "POST",
    url: "auth/register",
    data: registerParam,
  });

export const tokenCheck = () =>
  request<string, void>({
    method: "POST",
    url: "auth/check",
  });

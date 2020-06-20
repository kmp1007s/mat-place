import { createAction } from "typesafe-actions";
import { UserResponse } from "api/user";

export const GET_USER = "user/GET_USER";
export const GET_USER_SUCCESS = "user/GET_USER_SUCCESS";
export const GET_USER_FAIL = "user/GET_USER_FAIL";

export const getUser = createAction(GET_USER)<string>();
export const getUserSuccess = createAction(GET_USER_SUCCESS)<UserResponse>();
export const getUserFail = createAction(GET_USER_FAIL)();

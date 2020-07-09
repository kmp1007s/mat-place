import { createAction } from "typesafe-actions";
import * as api from "api/user";

export const GET_USER = "user/GET_USER";
export const GET_USER_SUCCESS = "user/GET_USER_SUCCESS";
export const GET_USER_FAIL = "user/GET_USER_FAIL";

export const UPDATE_USER = "user/UPDATE_USER";
export const UPDATE_USER_SUCCESS = "user/UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "user/UPDATE_USER_FAIL";

export const getUser = createAction(GET_USER)<string>();
export const getUserSuccess = createAction(GET_USER_SUCCESS)<
  api.UserResponse
>();
export const getUserFail = createAction(GET_USER_FAIL)();

export const updateUser = createAction(UPDATE_USER)<
  Parameters<typeof api.updateUserByUserId>[0] & {
    afterSuccess: Function;
  }
>();
export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS)<
  api.UserResponse
>();
export const updateUserFail = createAction(UPDATE_USER_FAIL)();

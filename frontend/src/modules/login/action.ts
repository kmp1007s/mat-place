import { createAction } from "typesafe-actions";
import { LoginParam, ReigsterParam } from "api/auth";

// Action Type
export const LOGIN = "login/LOGIN";
export const LOGIN_SUCCESS = "login/LOGIN_SUCCESS";
export const LOGIN_FAIL = "login/LOGIN_FAIL";

export const REGISTER = "login/REGISTER";
export const REGISTER_SUCCESS = "login/REGISTER_SUCCESS";
export const REGISTER_FAIL = "login/REGISTER_FAIL";

// Action Creator
export const login = createAction(LOGIN)<LoginParam>();
export const loginSuccess = createAction(LOGIN_SUCCESS)<string>();
export const loginFail = createAction(LOGIN_FAIL)();

export const register = createAction(REGISTER)<ReigsterParam>();
export const registerSuccess = createAction(REGISTER_SUCCESS)<string>();
export const reigsterFail = createAction(REGISTER_FAIL)();

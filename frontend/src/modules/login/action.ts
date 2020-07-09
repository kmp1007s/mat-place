import { createAction } from "typesafe-actions";
import { LoginParam, ReigsterParam } from "api/auth";

// Action Type
export const LOGIN = "login/LOGIN";
export const LOGIN_SUCCESS = "login/LOGIN_SUCCESS";
export const LOGIN_FAIL = "login/LOGIN_FAIL";
export const LOGIN_RESET = "login/LOGIN_RESET";

export const LOGOUT = "login/LOGOUT";
export const LOGOUT_SUCCESS = "login/LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "login/LOGOUT_FAIL";

export const REGISTER = "login/REGISTER";
export const REGISTER_SUCCESS = "login/REGISTER_SUCCESS";
export const REGISTER_FAIL = "login/REGISTER_FAIL";

export const TOKEN_CHECK = "login/TOKEN_CHECK";
export const TOKEN_CHECK_SUCCESS = "login/TOKEN_CHECK_SUCCESS";
export const TOKEN_CHECK_FAIL = "login/TOKEN_CHECK_FAIL";

// Action Creator
export const login = createAction(LOGIN)<LoginParam>();
export const loginSuccess = createAction(LOGIN_SUCCESS)<string>();
export const loginFail = createAction(LOGIN_FAIL)();
export const loginReset = createAction(LOGIN_RESET)();

export const logout = createAction(LOGOUT)();
export const logoutSuccess = createAction(LOGOUT_SUCCESS)();
export const logoutFail = createAction(LOGOUT_FAIL)();

export const register = createAction(REGISTER)<ReigsterParam>();
export const registerSuccess = createAction(REGISTER_SUCCESS)<string>();
export const reigsterFail = createAction(REGISTER_FAIL)();

export const tokenCheck = createAction(TOKEN_CHECK)();
export const tokenCheckSuccess = createAction(TOKEN_CHECK_SUCCESS)<string>();
export const tokenCheckFail = createAction(TOKEN_CHECK_FAIL)();

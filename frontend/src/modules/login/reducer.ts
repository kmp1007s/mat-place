import { LoginState, LoginAction } from "./type";
import { createReducer } from "typesafe-actions";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_RESET,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  TOKEN_CHECK_SUCCESS,
} from "./action";

const initialState: LoginState = {
  userId: "",
  loading: "UNSTARTED",
};

const reducer = createReducer<LoginState, LoginAction>(initialState, {
  [LOGIN]: (state, action) => ({ ...state, loading: "STARTED" }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    userId: action.payload,
    loading: "SUCCESS",
  }),
  [LOGIN_FAIL]: (state, action) => ({ ...state, loading: "FAIL" }),
  [LOGIN_RESET]: (state, action) => ({ ...state, loading: "UNSTARTED" }),
  [REGISTER]: (state, action) => ({ ...state, loading: "STARTED" }),
  [REGISTER_SUCCESS]: (state, action) => ({
    ...state,
    userId: action.payload,
    loading: "SUCCESS",
  }),
  [REGISTER_FAIL]: (state, action) => ({ ...state, loading: "FAIL" }),
  [TOKEN_CHECK_SUCCESS]: (state, action) => ({
    ...state,
    userId: action.payload,
  }),
});
export default reducer;

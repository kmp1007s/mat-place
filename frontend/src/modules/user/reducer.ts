import { UserState, UserAction } from "./type";
import { createReducer } from "typesafe-actions";
import { GET_USER, GET_USER_SUCCESS, GET_USER_FAIL } from "./action";

const initialState: UserState = {
  user: null,
  loading: "UNSTARTED",
};

const reducer = createReducer<UserState, UserAction>(initialState, {
  [GET_USER]: (state, action) => ({ ...state, loading: "STARTED" }),
  [GET_USER_SUCCESS]: (state, action) => ({
    ...state,
    user: action.payload,
    loading: "SUCCESS",
  }),
  [GET_USER_FAIL]: (state, action) => ({
    ...state,
    user: null,
    loading: "FAIL",
  }),
});
export default reducer;

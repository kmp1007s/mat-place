import { combineReducers } from "redux";
import login, { loginsSaga } from "./login";
import user, { usersSaga } from "./user";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  login,
  user,
});

export function* rootSaga() {
  yield all([loginsSaga(), usersSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

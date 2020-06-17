import { combineReducers } from "redux";
import login, { loginsSaga } from "./login";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  login,
});

export function* rootSaga() {
  yield all([loginsSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

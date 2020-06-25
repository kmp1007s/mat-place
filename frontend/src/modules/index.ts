import { combineReducers } from "redux";

import login, { loginsSaga } from "./login";
import user, { usersSaga } from "./user";
import placeList, { placeListsSaga } from "./placeList";

import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  login,
  user,
  placeList,
});

export function* rootSaga() {
  yield all([loginsSaga(), usersSaga(), placeListsSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

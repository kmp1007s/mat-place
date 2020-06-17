import { call, put, takeEvery } from "redux-saga/effects";

import { AxiosResponse } from "axios";
import * as api from "api/auth";

import { createAction, ActionType, createReducer } from "typesafe-actions";

// Action Type
const START_LOGIN = "login/START_LOGIN";
const LOGIN_SUCCESS = "login/LOGIN_SUCCESS";

// Action Creator
export const startLogin = createAction(START_LOGIN)<api.LoginParam>();
export const loginSuccess = createAction(LOGIN_SUCCESS)<string>();

// Reducer Action Type
const actions = { startLogin, loginSuccess };
type LoginAction = ActionType<typeof actions>;

// Reducer State Type
type LoginState = {
  userId: string;
};

const initialState: LoginState = {
  userId: "",
};

function* loginSaga(action: ReturnType<typeof startLogin>) {
  try {
    const { data }: AxiosResponse<api.LoginResponse> = yield call(
      api.login,
      action.payload
    );
    yield put(loginSuccess(data.userId));
  } catch (e) {
    console.log(e);
  }
}

export function* loginsSaga() {
  yield takeEvery(START_LOGIN, loginSaga);
}

const reducer = createReducer<LoginState, LoginAction>(initialState, {
  [LOGIN_SUCCESS]: (state, action) => ({ ...state, userId: action.payload }),
});

export default reducer;

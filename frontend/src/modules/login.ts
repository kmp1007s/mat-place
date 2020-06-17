import { call, put, takeEvery } from "redux-saga/effects";

import { AxiosResponse } from "axios";
import * as api from "api/auth";

// Action Type
const START_LOGIN = "login/START_LOGIN" as const;
const LOGIN_SUCCESS = "login/LOGIN_SUCCESS" as const;

// Action Creator
export const startLogin = (loginParam: api.LoginParam) => ({
  type: START_LOGIN,
  payload: loginParam,
});

export const loginSuccess = (userId: string) => ({
  type: LOGIN_SUCCESS,
  payload: userId,
});

// Reducer Action Type
type LoginAction =
  | ReturnType<typeof startLogin>
  | ReturnType<typeof loginSuccess>;

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

function reducer(state: LoginState = initialState, action: LoginAction) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, userId: action.payload };
    default:
      return state;
  }
}

export default reducer;

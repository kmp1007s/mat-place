import {
  login,
  loginSuccess,
  loginFail,
  register,
  registerSuccess,
  reigsterFail,
  tokenCheck,
  tokenCheckSuccess,
  tokenCheckFail,
  LOGIN,
  REGISTER,
  TOKEN_CHECK,
} from "./action";
import { AxiosResponse } from "axios";
import * as api from "api/auth";
import { call, put, takeEvery } from "redux-saga/effects";

function* loginSaga(action: ReturnType<typeof login>) {
  try {
    const { data }: AxiosResponse<api.LoginResponse> = yield call(
      api.login,
      action.payload
    );
    yield put(loginSuccess(data.userId));
  } catch (e) {
    console.log(e);
    yield put(loginFail());
  }
}

function* registerSaga(action: ReturnType<typeof register>) {
  try {
    const { data }: AxiosResponse<api.LoginResponse> = yield call(
      api.register,
      action.payload
    );
    yield put(registerSuccess(data.userId));
  } catch (e) {
    console.log(e);
    yield put(reigsterFail());
  }
}

function* tokenCheckSaga(action: ReturnType<typeof tokenCheck>) {
  try {
    const { data }: AxiosResponse<string> = yield call(api.tokenCheck);
    yield put(tokenCheckSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(tokenCheckFail());
  }
}

export function* loginsSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(REGISTER, registerSaga);
  yield takeEvery(TOKEN_CHECK, tokenCheckSaga);
}

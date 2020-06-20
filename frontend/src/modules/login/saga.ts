import { login, register, LOGIN, REGISTER } from "./action";
import { AxiosResponse } from "axios";
import * as api from "api/auth";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  loginSuccess,
  reigsterFail,
  registerSuccess,
  loginFail,
} from "modules/login";

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

export function* loginsSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(REGISTER, registerSaga);
}

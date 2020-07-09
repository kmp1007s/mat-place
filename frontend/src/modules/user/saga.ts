import {
  getUser,
  updateUser,
  updateUserFail,
  updateUserSuccess,
  UPDATE_USER,
} from "./action";
import { AxiosResponse } from "axios";
import * as api from "api/user";
import { call, put, takeEvery } from "redux-saga/effects";
import { GET_USER, getUserSuccess, getUserFail } from "./action";

type UserResponse = api.UserResponse;

function* getUserSaga(action: ReturnType<typeof getUser>) {
  try {
    const { data }: AxiosResponse<UserResponse> = yield call(
      api.getUserById,
      action.payload
    );
    yield put(getUserSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(getUserFail());
  }
}

function* updateUserSaga(action: ReturnType<typeof updateUser>) {
  try {
    const { data }: AxiosResponse<UserResponse> = yield call(
      api.updateUserByUserId,
      action.payload
    );

    yield put(updateUserSuccess(data));
    action.payload.afterSuccess();
  } catch (e) {
    console.log(e);
    yield put(updateUserFail());
  }
}

export function* usersSaga() {
  yield takeEvery(GET_USER, getUserSaga);
  yield takeEvery(UPDATE_USER, updateUserSaga);
}

import { getUser } from "./action";
import { AxiosResponse } from "axios";
import { UserResponse, getUserById } from "api/user";
import { call, put, takeEvery } from "redux-saga/effects";
import { GET_USER, getUserSuccess, getUserFail } from "./action";

function* getUserSaga(action: ReturnType<typeof getUser>) {
  try {
    const { data }: AxiosResponse<UserResponse> = yield call(
      getUserById,
      action.payload
    );
    yield put(getUserSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(getUserFail());
  }
}

export function* usersSaga() {
  yield takeEvery(GET_USER, getUserSaga);
}

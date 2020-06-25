import { AxiosResponse } from "axios";
import * as api from "api/place";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getPlaceListsByUser,
  getPlaceListsByUserSuccess,
  getPlaceListsByUserFail,
  GET_PLACELISTS_USER,
} from "./action";

function* getPlaceListUserSaga(action: ReturnType<typeof getPlaceListsByUser>) {
  try {
    const { data }: AxiosResponse<api.PlaceLists> = yield call(
      api.getPlaceListsByUser,
      action.payload
    );
    yield put(getPlaceListsByUserSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(getPlaceListsByUserFail());
  }
}

export function* placeListsSaga() {
  yield takeEvery(GET_PLACELISTS_USER, getPlaceListUserSaga);
}

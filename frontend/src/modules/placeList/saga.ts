import { AxiosResponse } from "axios";
import * as api from "api/place";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getPlaceListsByUser,
  getPlaceListsByUserSuccess,
  getPlaceListsByUserFail,
  GET_PLACELISTS_USER,
  addPlaceList,
  addPlaceListSuccess,
  addPlaceListFail,
  ADD_PLACELIST,
  updatePlaceList,
  updatePlaceListSuccess,
  updatePlaceListFail,
  UPDATE_PLACELIST,
  deletePlaceList,
  deletePlaceListSuccess,
  deletePlaceListFail,
  DELETE_PLACELIST,
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

function* addPlaceListSaga(action: ReturnType<typeof addPlaceList>) {
  try {
    const { data }: AxiosResponse<api.PlaceList> = yield call(
      api.addPlaceList,
      action.payload
    );

    yield put(addPlaceListSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(addPlaceListFail());
  }
}

function* updatePlaceListSaga(action: ReturnType<typeof updatePlaceList>) {
  try {
    const { data }: AxiosResponse<api.PlaceList> = yield call(
      api.updatePlaceList,
      ...action.payload
    );

    yield put(updatePlaceListSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(updatePlaceListFail());
  }
}

function* deletePlaceListSaga(action: ReturnType<typeof deletePlaceList>) {
  try {
    yield call(api.deletePlaceList, action.payload);
    yield put(deletePlaceListSuccess(action.payload));
  } catch (e) {
    console.log(e);
    yield put(deletePlaceListFail());
  }
}

export function* placeListsSaga() {
  yield takeEvery(GET_PLACELISTS_USER, getPlaceListUserSaga);
  yield takeEvery(ADD_PLACELIST, addPlaceListSaga);
  yield takeEvery(UPDATE_PLACELIST, updatePlaceListSaga);
  yield takeEvery(DELETE_PLACELIST, deletePlaceListSaga);
}

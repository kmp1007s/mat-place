import { createAction } from "typesafe-actions";
import { PlaceLists } from "api/place";

export const GET_PLACELISTS_USER = "place/GET_PLACELISTS_USER";
export const GET_PLACELISTS_USER_SUCCESS = "place/GET_PLACELISTS_USER_SUCCESS";
export const GET_PLACELISTS_USER_FAIL = "place/GET_PLACELISTS_USER_FAIL";

export const getPlaceListsByUser = createAction(GET_PLACELISTS_USER)<string>();
export const getPlaceListsByUserSuccess = createAction(
  GET_PLACELISTS_USER_SUCCESS
)<PlaceLists>();
export const getPlaceListsByUserFail = createAction(GET_PLACELISTS_USER_FAIL)();

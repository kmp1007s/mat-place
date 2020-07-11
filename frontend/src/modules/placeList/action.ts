import { createAction } from "typesafe-actions";
import * as api from "api/place";

export const GET_PLACELISTS_USER = "place/GET_PLACELISTS_USER";
export const GET_PLACELISTS_USER_SUCCESS = "place/GET_PLACELISTS_USER_SUCCESS";
export const GET_PLACELISTS_USER_FAIL = "place/GET_PLACELISTS_USER_FAIL";

export const ADD_PLACELIST = "place/ADD_PLACELIST";
export const ADD_PLACELIST_SUCCESS = "place/ADD_PLACELIST_SUCCESS";
export const ADD_PLACELIST_FAIL = "place/ADD_PLACELIST_FAIL";

export const UPDATE_PLACELIST = "place/UPDATE_PLACELIST";
export const UPDATE_PLACELIST_SUCCESS = "place/UPDATE_PLACELIST_SUCCESS";
export const UPDATE_PLACELIST_FAIL = "place/UPDATE_PLACELIST_FAIL";

export const DELETE_PLACELIST = "place/DELETE_PLACELIST";
export const DELETE_PLACELIST_SUCCESS = "place/DELETE_PLACELIST_SUCCESS";
export const DELETE_PLACELIST_FAIL = "place/DELETE_PLACELIST_FAIL";

export const getPlaceListsByUser = createAction(GET_PLACELISTS_USER)<string>();
export const getPlaceListsByUserSuccess = createAction(
  GET_PLACELISTS_USER_SUCCESS
)<api.PlaceLists>();
export const getPlaceListsByUserFail = createAction(GET_PLACELISTS_USER_FAIL)();

export const addPlaceList = createAction(ADD_PLACELIST)<
  Parameters<typeof api.addPlaceList>[0]
>();
export const addPlaceListSuccess = createAction(ADD_PLACELIST_SUCCESS)<
  api.PlaceList
>();
export const addPlaceListFail = createAction(ADD_PLACELIST_FAIL)();

export const updatePlaceList = createAction(UPDATE_PLACELIST)<
  [Parameters<typeof api.updatePlaceList>, { afterTodo: Function }]
>();
export const updatePlaceListSuccess = createAction(UPDATE_PLACELIST_SUCCESS)<
  api.PlaceList
>();
export const updatePlaceListFail = createAction(UPDATE_PLACELIST_FAIL)();

export const deletePlaceList = createAction(DELETE_PLACELIST)<
  Parameters<typeof api.deletePlaceList>[0]
>();
export const deletePlaceListSuccess = createAction(DELETE_PLACELIST_SUCCESS)<
  Parameters<typeof api.deletePlaceList>[0]
>();
export const deletePlaceListFail = createAction(DELETE_PLACELIST_FAIL)();

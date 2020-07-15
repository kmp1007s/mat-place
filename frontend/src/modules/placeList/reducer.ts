import { PlaceState, PlaceAction } from "./type";
import { createReducer } from "typesafe-actions";
import {
  GET_PLACELISTS_USER,
  GET_PLACELISTS_USER_SUCCESS,
  GET_PLACELISTS_USER_FAIL,
  ADD_PLACELIST_SUCCESS,
  UPDATE_PLACELIST_SUCCESS,
  DELETE_PLACELIST_SUCCESS,
  GET_PLACELISTS_GROUP_SUCCESS,
} from "./action";

const initialState: PlaceState = {
  placeLists: undefined,
  loading: "UNSTARTED",
};

const reducer = createReducer<PlaceState, PlaceAction>(initialState, {
  [GET_PLACELISTS_USER]: (state, action) => ({ ...state, loading: "STARTED" }),
  [GET_PLACELISTS_USER_SUCCESS]: (state, action) => ({
    ...state,
    placeLists: action.payload,
    loading: "SUCCESS",
  }),
  [GET_PLACELISTS_GROUP_SUCCESS]: (state, action) => ({
    ...state,
    placeLists: action.payload,
    loading: "SUCCESS",
  }),
  [GET_PLACELISTS_USER_FAIL]: (state, action) => ({
    ...state,
    loading: "FAIL",
  }),
  [ADD_PLACELIST_SUCCESS]: (state, action) => ({
    ...state,
    placeLists: state.placeLists
      ? state.placeLists.concat(action.payload)
      : [action.payload],
  }),
  [UPDATE_PLACELIST_SUCCESS]: (state, action) => ({
    ...state,
    placeLists: state.placeLists?.map((placeList) =>
      placeList._id === action.payload._id ? action.payload : placeList
    ),
  }),
  [DELETE_PLACELIST_SUCCESS]: (state, action) => ({
    ...state,
    placeLists: state.placeLists?.filter(
      (placeList) => placeList._id !== action.payload
    ),
  }),
});
export default reducer;

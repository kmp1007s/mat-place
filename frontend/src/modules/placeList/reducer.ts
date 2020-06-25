import { PlaceState, PlaceAction } from "./type";
import { createReducer } from "typesafe-actions";
import {
  GET_PLACELISTS_USER,
  GET_PLACELISTS_USER_SUCCESS,
  GET_PLACELISTS_USER_FAIL,
} from "./action";

const initialState: PlaceState = {
  placeLists: undefined,
};

const reducer = createReducer<PlaceState, PlaceAction>(initialState, {
  [GET_PLACELISTS_USER]: (state, action) => ({ ...state, loading: "STARTED" }),
  [GET_PLACELISTS_USER_SUCCESS]: (state, action) => ({
    ...state,
    placeLists: action.payload,
    loading: "SUCCESS",
  }),
  [GET_PLACELISTS_USER_FAIL]: (state, action) => ({
    ...state,
    loading: "FAIL",
  }),
});
export default reducer;

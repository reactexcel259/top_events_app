import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "../constant";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  status:[],
  message: ""
};

const getStateAndCityRequest = (state, action) => {
  return update(state, {
    isLoading: { $set: false },
    isError: { $set: false },
    message: { $set: "RequestSucccessfull" }
  });
};

const getStateAndCitySuccess = (state, action) =>
  update(state, {
    isLoading: { $set: false },
    isError: { $set: false },
    isSuccess: { $set: true },
    status: { $set: action.payload }
  });

export default handleActions(
  {
    [constants.GET_STATEANDCITY_REQUEST]: getStateAndCityRequest,
    [constants.GET_STATEANDCITY_SUCCESS]: getStateAndCitySuccess
  },
  initialState
);

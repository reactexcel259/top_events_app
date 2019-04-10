import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "../constant";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
};

const getStateAndCityEventRequest = (state, action) => {
  return update(state, {
    isLoading: { $set: false },
    isError: { $set: false },
    message: { $set: "RequestSucccessfull" }
  });
};

const getStateAndCityEventSuccess = (state, action) =>
  update(state, {
    isLoading: { $set: false },
    isError: { $set: false },
    isSuccess: { $set: true },
    status: { $set: action.payload }
  });

  const getStateAndCityEventError = (state, action) =>
  update(state, {
    isLoading: { $set: false },
    isError: { $set: true },
    isSuccess: { $set: false },
    status: { $set: action.payload }
  });

export default handleActions(
  {
    [constants.GET_STATEANDCITYEVENT_REQUEST]: getStateAndCityEventRequest,
    [constants.GET_STATEANDCITYEVENT_SUCCESS]: getStateAndCityEventSuccess,
    [constants.GET_STATEANDCITYEVENT_ERROR]: getStateAndCityEventError
  },
  initialState
);

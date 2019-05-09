import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "../constant";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  likeEvent:[]
};

const getLikeEventRequest = (state, action) => {
    return update(state, {
        isLoading: { $set: true },
        isError: { $set: false },
        isSuccess: { $set: false },
    });
  };
  
  const getLikeEventSuccess = (state, action) =>
    update(state, {
        isLoading: { $set: false },
        isError: { $set: false },
        isSuccess: { $set: true },
        likeEvent: { $set: action.payload }
    });

export default handleActions(
  {
    [constants.GET_LIKEEVENT_REQUEST]: getLikeEventRequest,
    [constants.GET_LIKEEVENT_SUCCESS]: getLikeEventSuccess,
  },
  initialState
);

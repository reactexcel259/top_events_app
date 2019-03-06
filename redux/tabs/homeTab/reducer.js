import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "../../constant";

const initialState = {
  register: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    eventData: [],
    events:[],
  }
};

const getEventRequest = (state, action) => {
  return update(state, {
    register: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "succcessfull" }
    }
  });
};

const getEventSuccess = (state, action) =>
  update(state, {
    register: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      eventData: { $push: [action.payload] }
    }
  });
  const getEventByIdRequest = (state, action) => {
    return update(state, {
      register: {
        isLoading: { $set: true },
        isError: { $set: false },
        isSuccess: { $set: true },
        message: { $set: "succcessfull" }
      }
    });
  };
  
  const getEventByIdSuccess = (state, action) =>
    update(state, {
      register: {
        isLoading: { $set: false },
        isError: { $set: false },
        isSuccess: { $set: true },
        events: { $set: action.payload.event }
      }
    });

export default handleActions(
  {
    [constants.GET_EVENT_REQUEST]: getEventRequest,
    [constants.GET_EVENT_SUCCESS]: getEventSuccess,
    [constants.GET_EVENTBYID_REQUEST]: getEventByIdRequest,
    [constants.GET_EVENTBYID_SUCCESS]: getEventByIdSuccess,
  },
  initialState
);

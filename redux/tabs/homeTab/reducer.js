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
    todayEvent:[],
    likeEvent:[],
    weeklyEvents:[],
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

    const getTodayEventRequest = (state, action) => {
      return update(state, {
        register: {
          isLoading: { $set: true },
          isError: { $set: false },
          isSuccess: { $set: true },
          message: { $set: "succcessfull" }
        }
      });
    };
    
    const getTodayEventSuccess = (state, action) =>
      update(state, {
      register: {
        isLoading: { $set: false },
        isError: { $set: false },
        isSuccess: { $set: true },
        todayEvent: { $set: action.payload }
      }
    });

//   const getLikeEventRequest = (state, action) => {
//   return update(state, {
//     register: {
//       isLoading: { $set: false },
//       isError: { $set: false },
//       isSuccess: { $set: true },
//     }
//   });
// };

// const getLikeEventSuccess = (state, action) =>
//   update(state, {
//     register: {
//       isLoading: { $set: false },
//       isError: { $set: false },
//       isSuccess: { $set: true },
//       likeEvent: { $set: action.payload }
//     }
//   });
  
  
export default handleActions(
  {
    [constants.GET_EVENT_REQUEST]: getEventRequest,
    [constants.GET_EVENT_SUCCESS]: getEventSuccess,
    [constants.GET_EVENTBYID_REQUEST]: getEventByIdRequest,
    [constants.GET_EVENTBYID_SUCCESS]: getEventByIdSuccess,
    [constants.GET_TODAY_EVENT_REQUEST]: getTodayEventRequest,
    [constants.GET_TODAY_EVENT_SUCCESS]: getTodayEventSuccess,
    // [constants.GET_LIKEEVENT_REQUEST]: getLikeEventRequest,
    // [constants.GET_LIKEEVENT_SUCCESS]: getLikeEventSuccess,
    // [constants.GET_WEEKLY_EVENTS_REQUEST]: getWeeklyEventsRequest,
    // [constants.GET_WEEKLY_EVENTS_SUCCESS]: getWeeklyEventsSuccess,
    // [constants.GET_WEEKLY_EVENTS_ERROR]: getWeeklyEventsError,
  },
  initialState
);

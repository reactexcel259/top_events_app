import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constant';

const initialState = {
  register: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    weeklyEvents:[],
  }
};
const getWeeklyEventsRequest = (state, action) => {
    return update(state, {
      register: {
        isLoading: { $set: true },
        isError: { $set: false },
        isSuccess: { $set: false },
      }
    });
  };
  
  const getWeeklyEventsSuccess = (state, action) =>
    update(state, {
      register: {
        isLoading: { $set: false },
        isError: { $set: false },
        isSuccess: { $set: true },
        weeklyEvents: { $set: action.payload }
      }
    });
    const getWeeklyEventsError = (state, action) =>
    update(state, {
      register: {
        isLoading: { $set: false },
        isError: { $set: true },
        isSuccess: { $set: false },
        weeklyEvents: { $set: action.payload }
      }
    });

    export default handleActions(
        {
          [constants.GET_WEEKLY_EVENTS_REQUEST]:getWeeklyEventsRequest,
          [constants.GET_WEEKLY_EVENTS_SUCCESS]:getWeeklyEventsSuccess,
          [constants.GET_WEEKLY_EVENTS_ERROR]:getWeeklyEventsError,
        },
        initialState
      );
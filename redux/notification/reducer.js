import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constant';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  status:{},
  data:[],
};

const getNotificationRequest = (state, action) =>{
    return(
 update(state, {
     isLoading: { $set: true },
     isError: { $set: false },
     isSuccess: { $set: false },
 }))};

const getNotificationSuccess = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     status: { $set: action.payload }
 });

const getNotificationError = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: true },
     isSuccess: { $set: false },
     status: { $set: action.payload }
 });

export default handleActions(
 {
   [constants.GET_NOTIFICATION_REQUEST]: getNotificationRequest,
   [constants.GET_NOTIFICATION_SUCCESS]: getNotificationSuccess,
   [constants.GET_NOTIFICATION_ERROR]: getNotificationError,
 },
 initialState
);
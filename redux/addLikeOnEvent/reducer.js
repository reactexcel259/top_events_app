import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constant';

const initialState = {
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: ""
};

const postAddLikeRequest = (state, action) =>{
    return(
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     message: { $set: "RequestSucccessfull" }
 }))};

const postAddLikeSuccess = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     status: { $set: action.payload }
 });
const setLikeEventDefault = (state, action) =>
    update(state, {
        isSuccess: { $set: false },
    });

export default handleActions(
 {
   [constants.POST_EVENT_LIKE_REQUEST]: postAddLikeRequest,
   [constants.POST_EVENT_LIKE_SUCCESS]: postAddLikeSuccess,
   [constants.SET_LIKE_EVENTS_DEFAULT]: setLikeEventDefault
 },
 initialState
);
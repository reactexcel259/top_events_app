import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constant';

const initialState = {
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: ""
};

const getEventDescriptionRequest = (state, action) =>{
    return(
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     message: { $set: "RequestSucccessfull" }
 }))};

const getEventDescriptionSuccess = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     status: { $set: action.payload }
 });

export default handleActions(
 {
   [constants.GET_EVENTDESCRIPTION_REQUEST]: getEventDescriptionRequest,
   [constants.GET_EVENTDESCRIPTION_SUCCESS]: getEventDescriptionSuccess
 },
 initialState
);
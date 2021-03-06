import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constant';

const initialState = {
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: "",
   selectedItem:null,
};

const getEventDescriptionRequest = (state, action) =>{
    return(
 update(state, {
     isLoading: { $set: true },
     isError: { $set: false },
     isSuccess: { $set: false }
 }))};

const getEventDescriptionSuccess = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     status: { $set: action.payload }
 });

const setSelectedEvent = (state,action) => 
    update(state, {
        selectedItem: { $set: action.payload },
    });
export default handleActions(
 {
   [constants.GET_EVENTDESCRIPTION_REQUEST]: getEventDescriptionRequest,
   [constants.GET_EVENTDESCRIPTION_SUCCESS]: getEventDescriptionSuccess,
   [constants.SET_SELECTED_EVENT]: setSelectedEvent,
 },
 initialState
);
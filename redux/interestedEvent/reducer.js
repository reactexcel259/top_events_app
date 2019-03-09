import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constant';

const initialState = {
   isLoading: false,
   attendingLoading:false,
   postingLoading:false,
   isError: false,
   isSuccess: false,
   message: "",
   status:[],
   attending:[],
   joinedTrue:false
};

const getInterestedEventRequest = (state, action) =>{
    return(
 update(state, {
     isLoading: { $set: true },
     isError: { $set: false },
     message: { $set: "requestSuccess" }
 }))};

const getInterestedEventSuccess = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     status: { $set: action.payload }
 });

 const getAttendingEventsRequest = (state, action) =>
 update(state, {
    attendingLoading: { $set: true },
 });

 const getAttendingEventSuccess = (state, action) =>
 update(state, {
     attendingLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     attending: { $set: action.payload }
 });

 const postJoiningEventsRequest = (state, action) =>
 update(state, {
    postingLoading: { $set: true },
 });
 const postJoiningEventsSuccess = (state, action) =>
 update(state, {
    postingLoading: { $set: false },
    joinedTrue:{$set:true}
 });
 const setAddEventDefault =(state, action) =>
 update(state, {
    joinedTrue:{$set:false}
 });

export default handleActions(
 {
   [constants.GET_INTERSTEDEVENT_REQUEST]: getInterestedEventRequest,
   [constants.GET_INTERSTEDEVENT_SUCCESS]: getInterestedEventSuccess,
   [constants.GET_ATTENDING_EVENT_REQUEST]: getAttendingEventsRequest,
   [constants.GET_ATTENDING_EVENT_SUCCESS]: getAttendingEventSuccess,
   [constants.POST_JOINING_EVENTS_REQUEST]: postJoiningEventsRequest,
   [constants.POST_JOINING_EVENTS_SUCCESS]: postJoiningEventsSuccess,
   [constants.SET_ADD_EVENT_DEFAULT]:setAddEventDefault,
 },
 initialState
);
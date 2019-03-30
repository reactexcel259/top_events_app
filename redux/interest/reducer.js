import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constant';

const initialState = {
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: "",
   status:[]
};

const getInterestRequest = (state, action) =>{
    return(
 update(state, {
     isLoading: { $set: true },
     isError: { $set: false },
     message: { $set: "requestSuccess" }
 }))};

const getInterestSuccess = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     status: { $set: action.payload }
 });

export default handleActions(
 {
   [constants.GET_INTEREST_REQUEST]: getInterestRequest,
   [constants.GET_INTEREST_SUCCESS]: getInterestSuccess
 },
 initialState
);
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

const getCategoryRequest = (state, action) =>{
    return(
 update(state, {
     isLoading: { $set: true },
     isError: { $set: false },
     message: { $set: "requestSuccess" }
 }))};

const getCategorySuccess = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     status: { $set: action.payload }
 });

export default handleActions(
 {
   [constants.GET_CATEGORY_REQUEST]: getCategoryRequest,
   [constants.GET_CATEGORY_SUCCESS]: getCategorySuccess
 },
 initialState
);
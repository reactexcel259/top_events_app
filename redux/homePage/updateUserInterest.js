import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "../constant";

const initialState = {
 user: {
   isLoading: false,
   isError: false,
   isSuccess: false,
   status:[]
 }
};

const updateUserDataRequest = (state, action) =>
 update(state, {
   user: {
     isLoading: { $set: true },
     isError: { $set: false },
     isSuccess: { $set: false },
     status: { $set: [] }
   }
 });

const updateUserDataSuccess = (state, action) =>
 update(state, {
   user: {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     status: { $set: action.payload }
   }
 });

export default handleActions(
 {
   [constants.UPDATE_USER_DATA_REQUEST]: updateUserDataRequest,
   [constants.UPDATE_USER_DATA_SUCCESS]: updateUserDataSuccess,
 },
 initialState
);
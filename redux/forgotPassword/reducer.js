import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constant';

const initialState = {
   isLoading: false,
   isError: false,
   isSuccess: false,
   data:null
};

const forgotPasswordRequest = (state, action) =>{
    return(
 update(state, {
     isLoading: { $set: true },
     isError: { $set: false },
     isSuccess: { $set: false }
 }))};

 const forgotPasswordSuccess = (state, action) =>
 update(state, {
     isError: { $set: false },
     isSuccess: { $set: true },
     isLoading: { $set: false },
     data: { $set: action.payload }
 });

 const forgotPasswordError = (state, action) =>
 update(state, {
    isError: { $set: true },
     isSuccess: { $set: false },
     isLoading: { $set: false },
     data: { $set: action.payload }
 });

export default handleActions(
 {
   [constants.FORGOT_PASSWORD_REQUEST]: forgotPasswordRequest,
   [constants.FORGOT_PASSWORD_SUCCESS]: forgotPasswordSuccess,
   [constants.FORGOT_PASSWORD_ERROR]: forgotPasswordError,
 },
 initialState
);
import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "../constant";

const initialState = {
 user: {
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: "",
   status:{},
   data:[],
   passwordReset:{},
   updateData:{},
 }
};

const getRegisterRequest = (state, action) =>
 update(state, {
   user: {
     isLoading: { $set: true },
     isError: { $set: false },
     isSuccess: { $set: false },
     message: { $set: "succcessfull" }
   }
 });

const getRegisterSuccess = (state, action) =>
 update(state, {
   user: {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     status: { $set: action.payload }
   }
 });

 const getRegisterError = (state, action) =>
 update(state, {
   user: {
     isLoading: { $set: false },
     isError: { $set: true },
     isSuccess: { $set: false },
     status: { $set: action.payload }
   }
 });

 const clearSuccessRequest = (state, action) =>
 update(state, {
   user: {
     isSuccess: { $set: false },
   }
 });

 const getUserDataSuccess = (state, action) =>
 update(state, {
   user: {
     data: { $set: action.payload }
   }
 });

 const userPasswordRequest = (state, action) =>
 update(state, {
   user: {
     passwordReset: { $set: true },
   }
 });

const userPasswordSuccess = (state, action) =>
 update(state, {
   user: {
     passwordReset: { $set: action.payload }
   }
 });

 const userPasswordError = (state, action) =>
 update(state, {
   user: {
     passwordReset: { $set: action.payload }
   }
 });

 const userDataRequest = (state, action) =>
 update(state, {
   user: {
     updateData: { $set: true },
   }
 });

const userDataSuccess = (state, action) =>
 update(state, {
   user: {
     updateData: { $set: action.payload }
   }
 });

 const userDataError = (state, action) =>
 update(state, {
   user: {
    updateData: { 
      $set: {
        error:true,
        message: action.payload
        } 
      }
   }
 });

export default handleActions(
 {
   [constants.GET_REGISTER_REQUEST]: getRegisterRequest,
   [constants.GET_REGISTER_SUCCESS]: getRegisterSuccess,
   [constants.GET_REGISTER_ERROR]: getRegisterError,

   [constants.GET_LOGIN_REQUEST]: getRegisterRequest,
   [constants.GET_LOGIN_SUCCESS]: getRegisterSuccess,
   [constants.GET_LOGIN_ERROR]: getRegisterError,

   [constants.USER_PASSWORD_REQUEST]: userPasswordRequest,
   [constants.USER_PASSWORD_SUCCESS]: userPasswordSuccess,
   [constants.USER_PASSWORD_ERROR]: userPasswordError,

   [constants.USER_DATA_REQUEST]: userDataRequest,
   [constants.USER_DATA_SUCCESS]: userDataSuccess,
   [constants.USER_DATA_ERROR]: userDataError,

   [constants.GET_USER_DATA_SUCCESS]: getUserDataSuccess,

   [constants.CLOSE_SUCCESS_MODAL]: clearSuccessRequest,
   
 },
 initialState
);
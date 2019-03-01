import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "../constant";

const initialState = {
 user: {
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: "",
   status: {}
 }
};

const getRegisterRequest = (state, action) =>
 update(state, {
   user: {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
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

export default handleActions(
 {
   [constants.GET_REGISTER_REQUEST]: getRegisterRequest,
   [constants.GET_REGISTER_SUCCESS]: getRegisterSuccess,
   [constants.GET_REGISTER_ERROR]: getRegisterError,

   [constants.GET_LOGIN_REQUEST]: getRegisterRequest,
   [constants.GET_LOGIN_SUCCESS]: getRegisterSuccess,
   [constants.GET_LOGIN_ERROR]: getRegisterError,

   [constants.CLOSE_SUCCESS_MODAL]: clearSuccessRequest,
   
 },
 initialState
);
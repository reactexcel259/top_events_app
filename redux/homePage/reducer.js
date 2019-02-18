import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from "../constant";

const initialState = {
 register: {
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: ""
 }
};

const getRegisterRequest = (state, action) =>
 update(state, {
   register: {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     message: { $set: "succcessfull" }
   }
 });

const getRegisterSuccess = (state, action) =>
 update(state, {
   register: {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     status: { $set: action.payload }
   }
 });

export default handleActions(
 {
   [constants.GET_REGISTER_REQUEST]: getRegisterRequest,
   [constants.GET_REGISTER_SUCCESS]: getRegisterSuccess
 },
 initialState
);
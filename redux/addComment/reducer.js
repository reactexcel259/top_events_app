import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constant';

const initialState = {
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: ""
};

const postAddCommentRequest = (state, action) =>{
    return(
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     message: { $set: "RequestSucccessfull" }
 }))};

const postAddCommentSuccess = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     status: { $set: action.payload }
 });

export default handleActions(
 {
   [constants.POST_ADDCOMMENT_REQUEST]: postAddCommentRequest,
   [constants.POST_ADDCOMMENT_SUCCESS]: postAddCommentSuccess
 },
 initialState
);
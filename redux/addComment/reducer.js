import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as constants from '../constant';

const initialState = {
   isLoading: false,
   isError: false,
   isSuccess: false,
   message: "",
   type:''
};

const postAddCommentRequest = (state, action) =>{
    return(
 update(state, {
     isLoading: { $set: true },
     isError: { $set: false },
     isError: { $set: false },
     type: { $set: "comment" }
 }))};

const postAddCommentSuccess = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     status: { $set: action.payload }
 });

const postAddCommentError = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: true },
     isSuccess: { $set: false },
     status: { $set: action.payload }
 });

const postLikeCommentRequest = (state, action) =>{
    return(
 update(state, {
     isLoading: { $set: true },
     isError: { $set: false },
     isError: { $set: false },
     type: { $set: "like" }
 }))};

const postLikeCommentSuccess = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: true },
     status: { $set: action.payload }
 });

const postLikeCommentError = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: true },
     isSuccess: { $set: false },
     status: { $set: action.payload }
 });

const cleanCommentSuccess = (state, action) =>
 update(state, {
     isLoading: { $set: false },
     isError: { $set: false },
     isSuccess: { $set: false },
     type:{ $set: "" }
 });

export default handleActions(
 {
    [constants.POST_ADDCOMMENT_REQUEST]: postAddCommentRequest,
    [constants.POST_ADDCOMMENT_SUCCESS]: postAddCommentSuccess,
    [constants.POST_ADDCOMMENT_ERROR]: postAddCommentError,

    [constants.CLEAN_COMMENT_SUCCESS]:cleanCommentSuccess,

    [constants.POST_LIKECOMMENT_REQUEST]: postLikeCommentRequest,
    [constants.POST_LIKECOMMENT_SUCCESS]: postLikeCommentSuccess,
    [constants.POST_LIKECOMMENT_ERROR]: postLikeCommentError,
 },
 initialState
);
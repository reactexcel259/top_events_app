import * as actions from '../action';
import fireAjax from '../../services/index';
import {call,put} from "redux-saga/effects";

export function* postAddCommentRequest(action) {
  let id = action.payload.id;
    const header = {
      "Authorization":action.payload.token
    };
 try {
    const response = yield call(fireAjax, "POST", `/events/addComment/${id}`,header, {
      ...action.payload.data
    });
    if (response) {
      yield put(actions.postAddCommentSuccess(response.data));
      yield put(actions.getEventDescriptionSuccess(response.data));
    }
  } catch (e) {
    yield put(actions.postAddCommentError());
  }
 }

 export function* postLikeCommentRequest(action) {
  let id = action.payload.id;
  const header = {
    "Authorization":action.payload.token
  };
 try {
    const response = yield call(fireAjax, "PUT", `/comment/addLike/${id}`,header,'');
    if (response) {
      yield put(actions.postLikeCommentSuccess(response.data));
    }
  } catch (e) {
    yield put(actions.postLikeCommentError());
  }
 }
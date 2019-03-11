import * as actions from '../action';
import fireAjax from '../../services/index';
import {call,put} from "redux-saga/effects";

export function* postAddCommentRequest(action) {
  console.log(action,'post commit')
  let id = action.payload.id;
 try {
    const response = yield call(fireAjax, "POST", "/comment/addLike/5c5e6ebf1a3e5c350ede4029", {
      ...action.payload.data
    });
    if (response) {
      yield put(actions.postAddCommentSuccess(response.data));
    }
  } catch (e) {
    yield put(actions.postAddCommentError());
  }
 }
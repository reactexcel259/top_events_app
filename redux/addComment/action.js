import * as actions from '../action';
import fireAjax from '../../services/index';
import {call,put} from "redux-saga/effects";

export function* postAddCommentRequest(action) {
 try {
    const response = yield call(fireAjax, "POST", "http://ec2-18-225-32-25.us-east-2.compute.amazonaws.com:3000/api/comment/addLike/5c5e6ebf1a3e5c350ede4029", {});
    if (response) {
      yield put(actions.postAddCommentSuccess(response.data));
    }
  } catch (e) {
    yield put(actions.postAddCommentError());
  }
 }
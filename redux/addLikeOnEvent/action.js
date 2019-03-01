import * as actions from '../action';
import fireAjax from '../../services/index';
import {call,put} from "redux-saga/effects";

export function* postAddLikeRequest(action) {
 try {
    const response = yield call(fireAjax, "PUT", `http://ec2-18-225-32-25.us-east-2.compute.amazonaws.com:3000/api/events/addInterest/${action.payload}`, {});
    if (response) {
      yield put(actions.postEventLikeSuccess(response.data));
    }
  } catch (e) {
    yield put(actions.postEventLikeError());
  }
 }
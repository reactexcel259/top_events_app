import * as actions from '../action';
import fireAjax from '../../services/index';
import {call,put} from "redux-saga/effects";

export function* postAddLikeRequest(action) {
  const header = {
    "Authorization":action.payload.token
  };
 try {
    const response = yield call(fireAjax, "PUT", `/events/addInterest/${action.payload.eventId}`, header, null);
    if (response) {
      yield put(actions.postEventLikeSuccess(response.data));
    }
  } catch (e) {

    yield put(actions.postEventLikeError());
  }
 }
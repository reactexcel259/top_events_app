import * as actions from '../action';
import fireAjax from '../../services/index';
import {call,put} from "redux-saga/effects";


export function* getNotificationRequest(action) {
    const header = {
    "Authorization":action.payload.token
  };
 try {
    const response = yield call(fireAjax, "GET", `/getNotifications`,header,'');
    if (response) {
      yield put(actions.getNotificationSuccess(response.data));
    }
  } catch (e) {
    yield put(actions.getNotificationError(e));
  }
 }
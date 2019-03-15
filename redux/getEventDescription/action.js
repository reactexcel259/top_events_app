import * as actions from '../action';
import fireAjax from '../../services/index';
import {call,put} from "redux-saga/effects";

export function* getEventDescriptionRequest(action) {
 try {
    const response = yield call(fireAjax, "GET", `/getEvent/${action.payload}`,'');
    if (response) {
      yield put(actions.getEventDescriptionSuccess(response.data));
    }
  } catch (e) {
    yield put(actions.getEventDescriptionError());
  }
 }
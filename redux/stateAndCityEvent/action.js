import * as actions from '../action';
import fireAjax from '../../services';
import {call,put} from "redux-saga/effects";

export function* getStateAndCityEventRequest(action) {
 try {
    const response = yield call(fireAjax, "GET", `/events?EventState=${action.payload.location}&userId=${action.payload.userId}`);
    if (response) {
      yield put(actions.getStateAndCityEventSuccess(response.data));
    }
  } catch (e) {
    yield put(actions.getStateAndCityEventError(e));
  }
 }
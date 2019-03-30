import * as actions from '../action';
import fireAjax from '../../services';
import {call,put} from "redux-saga/effects";

export function* getStateAndCityEventRequest(action) {
 try {
    const response = yield call(fireAjax, "POST", `/getNearestEvents?EventCity=${action.payload}`);
    if (response) {
      yield put(actions.getStateAndCityEventSuccess(response.data));
    }
  } catch (e) {
    yield put(actions.getStateAndCityEventError());
  }
 }
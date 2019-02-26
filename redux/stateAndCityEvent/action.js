import * as actions from '../action';
import fireAjax from '../../services';
import {call,put} from "redux-saga/effects";

export function* getStateAndCityEventRequest(action) {
 try {
    const response = yield call(fireAjax, "GET", `http://ec2-18-225-32-25.us-east-2.compute.amazonaws.com:3000/api/events?EventCity=${action.payload}`, {
    ...action.payload
    });
    if (response) {
      yield put(actions.getStateAndCityEventSuccess(response.data));
    }
  } catch (e) {
    yield put(actions.getStateAndCityEventError());
  }
 }
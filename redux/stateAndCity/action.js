import * as actions from '../action';
import fireAjax from '../../services';
import {call,put} from "redux-saga/effects";

export function* getStateAndCityRequest(action) {
 try {
    const response = yield call(fireAjax, "GET", "/getEventCities", {
    ...action.payload
    });
    if (response) {
      yield put(actions.getStateAndCitySuccess(response.data));
    }
  } catch (e) {
    yield put(actions.getStateAndCityError());
  }
 }
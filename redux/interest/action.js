import * as actions from '../action';
import fireAjax from '../../services/index';
import {call,put} from "redux-saga/effects";

export function* getInterestRequest(action) {
 try {
    const response = yield call(fireAjax, "GET", "/getTags", );
    if (response) {
      yield put(actions.getInterestSuccess(response.data));
    }
  } catch (e) {
    yield put(actions.getInterestError(e));
  }
 }
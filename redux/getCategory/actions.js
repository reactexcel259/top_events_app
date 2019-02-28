import * as actions from '../action';
import fireAjax from '../../services/index';
import {call,put} from "redux-saga/effects";

export function* getCategoryRequest(action) {
 try {
    const response = yield call(fireAjax, "GET", "/getCategory", {
    ...action.payload
    });
    if (response) {
      yield put(actions.getCategorySuccess(response.data));
    }
  } catch (e) {
    yield put(actions.getCategoryError());
  }
 }
import * as actions from '../action';
import fireAjax from '../../services/index';
import {call,put} from "redux-saga/effects";

export function* getCategoryRequest(action) {
 try {
    const response = yield call(fireAjax, "GET", "http://ec2-18-225-32-25.us-east-2.compute.amazonaws.com:3000/api/getCategory", {
    ...action.payload
    });
    if (response) {
      yield put(actions.getCategorySuccess(response.data));
    }
  } catch (e) {
    yield put(actions.getCategoryError());
  }
 }
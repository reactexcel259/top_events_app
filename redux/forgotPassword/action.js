import * as actions from '../action';
import fireAjax from '../../services/index';
import {call,put} from "redux-saga/effects";

export function* forgotPasswordRequest(action) {
    const header = {
          "Authorization":action.payload.token
        };
    try {
      const response = yield call(fireAjax, "POST", `/forget/password`,"",{email:action.payload});
      if (response) {
        
        yield put(actions.forgotPasswordSuccess(response.data));
      }
    } catch (e) {
      yield put(actions.forgotPasswordError());
    }
  }
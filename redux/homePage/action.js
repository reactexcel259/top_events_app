
import * as actions from "../action"
import {BASE_URL} from "../../config/index";
import fireAjax from "../../services/index"
import {call,put} from "redux-saga/effects"

export function* getRegisterRequest(action) {
  
 try {
    const response = yield call(fireAjax, "POST", "api/", {
    ...action.payload
    });

    if (response) {
    //   yield put(actions.getRegisterSuccess(response.data));
    }
  } catch (e) {
    // yield put(actions.getRegisterError());
  }
 }